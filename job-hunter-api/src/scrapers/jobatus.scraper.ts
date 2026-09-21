import { uniqBy } from 'lodash';
import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import { JOBATUS_URLS } from '../urls/urls';
import ScraperInterface from './scraperInterface';

const platform: JobPlatform = JobPlatform.JOBATUS;
export default class JobatusScraper extends ScraperInterface {
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
    for (const url of JOBATUS_URLS) {
      try {
        await page.goto(url);
        const urls: string[] = await page?.$$eval('p.jobtitle > a', (el) =>
          el?.map((cur) => cur?.href),
        );
        result?.push(...urls?.map((url) => this.convertUrlToJobInitialData(url)));
      } catch (e) {
        this.log(e, { error: true });
        continue;
      }
    }
    return uniqBy(result, 'idInPlatform');
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

        const title = await page?.$eval(
          '#offer_title',
          (el) => el?.textContent,
        );
        const infoArray: string[] = await page?.$$eval(
          'span.detail_body',
          (el) => el?.map((cur) => cur?.innerText),
        );
        const company = infoArray?.[0];
        const city = infoArray?.[0]?.split('-')?.[0]?.trim();
        const state = infoArray?.[0]?.split('-')?.[1]?.trim();
        const descriptionOriginal = await page?.$eval(
          '#description_body',
          (el) => el?.textContent,
        );
        const analyzerResponse = analyzeDescription({
          title,
          description: descriptionOriginal,
        });

        jobs?.push({
          title,
          company,
          city,
          state,
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
      idInPlatform: url?.split('-')?.[url?.split('-')?.length - 1],
    };
  }
}
