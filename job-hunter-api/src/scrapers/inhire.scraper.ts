import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './scraperInterface';
import { INHIRE_URLS } from '../urls/urls';
import { sleep } from '../utils/utils';

const platform: JobPlatform = JobPlatform.INHIRE;
export default class InhireScraper extends ScraperInterface {
  constructor({ initialUrl }: { initialUrl?: string }) {
    super({ platform, initialUrl });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({ abortScript: false, abortStyle: true });
    this.log('Start');

    const urls = await this.getUrls(page);
    this.log(`Scraped jobs: ${urls?.length}`);
    const filteredUrls = await this.filterJobs(urls);
    this.log(`Filtered jobs: ${filteredUrls?.length}`);

    const jobs: JobInput[] = await this.getDetails(page, filteredUrls);

    await browser.close();

    this.log('End');
    return jobs;
  }

  private async getUrls(page: Page): Promise<JobInitialData[]> {
    if (!!this.initialUrl) {
      return [this.convertUrlToJobInitialData(this.initialUrl)];
    }

    const result: JobInitialData[] = [];
    for (const url of INHIRE_URLS) {
      try {
        await page.goto(url);
        await page.waitForSelector('a[data-component-name="job-position-link"]');
        await sleep(100);
        const urls: string[] = await page?.$$eval('a[data-component-name="job-position-link"]', (el) =>
          el?.map((cur) => cur?.href),
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
        await page.goto(obj?.url);
        await page.waitForSelector('div[data-component-name="HtmlParser"]');
        await sleep(100);

        const title = await page?.$eval(
          'h1',
          (el) => el?.innerText,
        );
        const company = obj?.url?.split('https://')?.[1]?.split('.')?.[0];
        const description = await page?.$eval(
          'div[data-component-name="HtmlParser"]',
          (el) => el?.innerText,
        );
        const analyzerResponse = analyzeDescription({
          title,
          description,
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
      idInPlatform: url?.split('vagas/')?.[1]?.split('/')?.[0],
    };
  }
}
