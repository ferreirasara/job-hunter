import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import ScraperInterface from './scraperInterface';
import { GREENHOUSE_URLS } from '../urls/urls';

const platform: JobPlatform = JobPlatform.GREENHOUSE;
export default class GreenhouseScraper extends ScraperInterface {
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
    for (const url of GREENHOUSE_URLS) {
      for (const keyword of ['react', 'frontend', 'developer', 'desenvolvedor']) {
        try {
          await page.goto(url + keyword);

          let urls: string[] = [];

          try {
            urls = await page?.$$eval('div.col-12 > a', (el) => el?.map((cur) => cur?.href));
          } catch (e) { }
          try {
            urls = await page?.$$eval('td.cell > a', (el) => el?.map((cur) => cur?.href));
          } catch (e) { }

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

        const title = await page?.$eval(
          'h1',
          (el) => el?.innerText,
        );
        const company = obj?.url?.split('greenhouse.io/')?.[1]?.split('/')?.[0];
        const description = await page?.$eval('div.job__description.body', (el) => el?.innerText);
        const analyzerResponse = analyzeDescription({ title, description });

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
      idInPlatform: url?.split('jobs/')?.[1]?.split('?')?.[0],
    };
  }
}
