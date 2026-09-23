import { uniq } from 'lodash';
import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './scraperInterface';
import { REMOTAR_URLS } from '../urls/urls';

const platform: JobPlatform = JobPlatform.REMOTAR;

export default class RemotarScraper extends ScraperInterface {
  constructor({ initialUrl }: { initialUrl?: string }) {
    super({ platform, initialUrl });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({ abortScript: false });
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
    for (const url of REMOTAR_URLS) {
      try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        const localUrls: string[] = await page?.$$eval(
          'a.job-title',
          (el) => el?.map((cur) => cur?.href),
        );
        allUrls.push(...localUrls);
      } catch (e) {
        this.log(e, { error: true, url });
      }
    }

    const urls: JobInitialData[] = uniq(allUrls)?.map((url) => this.convertUrlToJobInitialData(url));

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
        await page.goto(obj?.url, { waitUntil: 'domcontentloaded' });
        const title = await page?.$eval('h1.job-title', (el) => el?.innerText);
        const company = await page?.$eval('p.h2', (el) => el?.innerText);
        const descriptionOriginal = await page?.$$eval(
          'div.job-info-box',
          (el) => el?.map((cur) => cur?.innerText)?.join('\n\n'),
        );
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
      idInPlatform: url?.split('job/')?.[1]?.split('/')?.[0],
    };
  }
}
