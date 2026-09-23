import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import { LINKEDIN_URLS } from '../urls/urls';
import { sleep } from '../utils/utils';
import ScraperInterface from './scraperInterface';

const platform: JobPlatform = JobPlatform.LINKEDIN;
export default class LinkedinScraper extends ScraperInterface {
  constructor({ initialUrl }: { initialUrl?: string }) {
    super({ platform, initialUrl });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({});
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
    for (const url of LINKEDIN_URLS) {
      try {
        await page.goto(url);

        const urls: string[] = await page?.$$eval(
          'a.base-card__full-link',
          (el) => el?.map((cur) => cur?.href),
        );
        result?.push(...urls?.map((url) => this.convertUrlToJobInitialData(url)));
      } catch (e) {
        this.log(e, { error: true });
        continue;
      }
    }
    return result;
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
        await sleep(500);
        await page.goto(obj?.url, { waitUntil: 'networkidle0', timeout: 2000 });
        const title: string = await page?.$eval(
          'h1.top-card-layout__title',
          (el) => el?.innerText,
        );
        const company: string = await page?.$eval(
          'span.topcard__flavor',
          (el) => el?.innerText,
        );
        if (
          company?.toLowerCase() === 'programathor' ||
          company?.toLowerCase() === 'geekuunter'
        )
          continue;
        const descriptionOriginal: string = await page?.$$eval(
          'div.description__text',
          (el) => el?.map((cur) => cur?.innerText)?.join('\n\n'),
        );

        let jobCriteria: string;
        try {
          jobCriteria = await page?.$eval('div.description__job-criteria-list', (el) => el?.innerText);
        } catch (e) {
          jobCriteria = '';
        }

        const description = `${descriptionOriginal}\n\n${jobCriteria}`;
        const analyzerResponse = analyzeDescription({
          title,
          description,
        });

        jobs?.push({
          title,
          company: company?.trim(),
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
        if (
          !JSON.stringify(e)?.includes('failed to find element') &&
          !JSON.stringify(e)?.includes('TimeoutError')
        )
          this.log(e, { error: true, url: urls[i]?.url });
        continue;
      }
    }

    return jobs;
  }

  protected convertUrlToJobInitialData(url: string): JobInitialData {
    const urlSplit = url?.split('?')?.[0]?.split('-');
    return {
      url,
      idInPlatform: urlSplit?.[urlSplit?.length - 1],
    };
  }
}
