import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import ScraperInterface from './scraperInterface';
import { RECRUTEI_URLS } from '../urls/urls';
import { sleep } from '../utils/utils';
import { KEYWORDS } from '../constants/keywords';

const platform: JobPlatform = JobPlatform.RECRUTEI;
export default class RecruteiScraper extends ScraperInterface {
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
    for (const url of RECRUTEI_URLS) {
      for (const keyword of KEYWORDS) {
        try {
          await page.goto(url + keyword);
          await sleep(500);

          const urls = await page?.$$eval('#vacancies > div > div > div > div > a', (el) => el?.map((cur) => cur?.href));

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
          'h2',
          (el) => el?.innerText,
        );
        const company = obj?.url?.split('jobs.recrutei.com.br/')?.[1]?.split('/')?.[0];

        const description1 = await page?.$eval('div.container-left', (el) => el?.innerText);
        const description2 = await page?.$eval('div.container-right', (el) => el?.innerText);
        const analyzerResponse = analyzeDescription({ title, description: description1 + '\n' + description2 });

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
      idInPlatform: url?.split('vacancy/')?.[1]?.split('-')?.[0],
    };
  }
}
