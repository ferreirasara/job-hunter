import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import ScraperInterface from './scraperInterface';
import { BUSCO_JOBS_URLS } from '../urls/urls';
import { sleep } from '../utils/utils';

const platform: JobPlatform = JobPlatform.BUSCO_JOBS;
export default class BuscoJobsScraper extends ScraperInterface {
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
    for (const url of BUSCO_JOBS_URLS) {
      for (let pageNumber = 1; pageNumber <= 5; pageNumber++) { // Assuming you want to scrape the first 5 pages
        try {
          await page.goto(url + pageNumber);
          await sleep(100);
          const urls: string[] = await page?.$$eval('h3 > a', (el) => el?.map((cur) => cur?.href));
          result?.push(...urls?.map((url) => this.convertUrlToJobInitialData(url)));
        } catch (e) {
          this.log(e, { error: true, url });
          continue;
        }
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
        await sleep(100);

        const title = await page?.$eval('h1', (el) => el?.innerText);
        const company = await page?.$eval('div.OfertaDetalle_jobItem__zVLsZ', (el) => el?.innerText);
        const location = await page?.$eval('div.OfertaDetalle_jobItem__zVLsZ > a', (el) => el?.innerText);
        const city = location?.split(',')?.[0];
        const state = location?.split(',')?.[1]?.trim();

        const description = await page?.$eval('div.OfertaDetalle_descripcion_texto__F8kjv', (el) => el?.innerText);
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
          city,
          state,

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
      idInPlatform: url?.split('ID-')?.[1],
    };
  }
}
