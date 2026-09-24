import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import ScraperInterface from './scraperInterface';
import { STARTUP_URLS } from '../urls/urls';

const platform: JobPlatform = JobPlatform.STARTUP;

export default class StartupScraper extends ScraperInterface {
  constructor({ initialUrl }: { initialUrl?: string }) {
    super({ platform, initialUrl });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({ abortScript: false, abortStyle: false });
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

    const allUrls: string[] = [];
    for (const url of STARTUP_URLS) {
      try {
        await page.goto(url);
        const selector = 'div.grow.overflow-hidden > div.flex.flex-col.justify-center > a.flex.items-center.gap-1.font-medium';
        await page.waitForSelector(selector);
        const localUrls: string[] = await page?.$$eval(selector, (el) => el?.map((cur) => cur?.href));
        allUrls.push(...localUrls?.filter((cur) => !cur.includes('early_access')));
      } catch (e) {
        this.log(e, { error: true, url });
        continue;
      }
    }

    const urls: JobInitialData[] = allUrls.map((url) => this.convertUrlToJobInitialData(url));

    return urls;
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
        await page.goto(obj?.url);
        const title = await page?.$eval('h1', (el) => el?.innerText);
        const company = await page?.$eval(
          'a.text-sm.font-medium.text-gray-500',
          (el) => el?.innerText,
        );
        const location = await page?.$$eval(
          'div.flex.flex-wrap.gap-x-6.gap-y-2.mt-3.pb-4.mb-4.border-b > div:nth-child(2)',
          (el) => el?.map((cur) => cur?.innerText),
        );

        const descriptionOriginal = await page?.$eval(
          'div.pb-8',
          (el) => el?.innerText,
        );
        const analyzerResponse = analyzeDescription({
          title,
          description: descriptionOriginal,
        });

        jobs?.push({
          title,
          company,
          city: location?.[0],
          country: location?.[1],
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
    const urlSplit = url?.split('-');
    return {
      url,
      idInPlatform: urlSplit?.[urlSplit?.length - 1],
    };
  }
}
