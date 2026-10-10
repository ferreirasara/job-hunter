import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import ScraperInterface from './scraperInterface';
import { sleep } from '../utils/utils';
import { KEYWORDS } from '../constants/keywords';

const platform: JobPlatform = JobPlatform.REMOTIFYEUROPE;

export default class RemotifyEuropeScraper extends ScraperInterface {
  constructor({ initialUrl }: { initialUrl?: string }) {
    super({ platform, initialUrl });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({ abortStyle: false, abortScript: false });
    this.log('Start');

    const urls = await this.getUrls(page);
    this.log(`Scraped jobs: ${urls?.length}`);
    const filteredUrls = await this.filterJobs(urls);
    this.log(`Filtered jobs: ${filteredUrls?.length}`);

    const jobs = await this.getDetails(page, filteredUrls);
    await browser.close();

    this.log('End');
    return jobs;
  }

  private async getUrls(page: Page): Promise<JobInitialData[]> {
    if (!!this.initialUrl) {
      return [this.convertUrlToJobInitialData(this.initialUrl)];
    }

    const result: JobInitialData[] = [];
    try {
      await page.goto('https://remotifyeurope.com/remote-jobs');

      for (const keyword of KEYWORDS) {
        await page.type('input#title', keyword);
        await sleep(1000);
        const urls: string[] = await page?.$$eval(
          'a.w-full.flex.flex-col.items-center.justify-center',
          (el) => el?.map((cur) => cur?.href),
        );

        result.push(...urls.map((url) => this.convertUrlToJobInitialData(url)));
      }

      return result;
    } catch (e) {
      this.log(e, { error: true });
      return [];
    }
  }

  private async getDetails(
    page: Page,
    urls: JobInitialData[],
  ): Promise<JobInput[]> {
    const urlsLength = urls?.length;
    const jobs: JobInput[] = [];
    for (let i = 0; i < urlsLength; i++) {
      try {
        const obj = urls[i];
        await page.goto(obj?.url, { waitUntil: 'domcontentloaded' });
        const title = await page?.$eval('h1', (el) => el?.innerText);
        const company = await page?.$eval('p.text-xl.text-gray-700.font-medium.flex.items-center', (el) => el?.innerText);
        const descriptionOriginal = await page?.$$eval('section.w-full > div', (el) => el?.map((cur) => cur?.innerText)?.join('\n\n'));
        const analyzerResponse = analyzeDescription({
          title,
          description: descriptionOriginal,
        });

        jobs?.push({
          title,
          company,
          description: analyzerResponse?.description,
          url: obj?.url,
          idInPlatform: obj?.idInPlatform,
          type: analyzerResponse?.type,
          platform: this.platform,
          skills: analyzerResponse?.skills?.join(','),
          benefits: analyzerResponse?.benefits?.join(','),
          benefitsRating: analyzerResponse?.benefitsRating,
          skillsRating: analyzerResponse?.skillsRating,
          hiringRegime: analyzerResponse?.hiringRegime,
          seniority: analyzerResponse?.seniority,
        });
      } catch (e) {
        this.log(e, { error: true, url: urls?.[i]?.url });
        continue;
      }
    }

    return jobs;
  }

  protected convertUrlToJobInitialData(url: string): JobInitialData {
    return {
      url,
      idInPlatform: url?.split('/listing/')?.[1],
    };
  }
}
