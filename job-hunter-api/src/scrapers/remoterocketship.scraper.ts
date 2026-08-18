import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './scraperInterface';
import { INHIRE_URLS, REMOTEROCKETSHIP_URLS } from '../urls/urls';

const platform: JobPlatform = JobPlatform.REMOTEROCKETSHIP;
export default class RemoteRocketshipScraper extends ScraperInterface {
  constructor({
    filterExistentsJobs = true,
  }: {
    filterExistentsJobs?: boolean;
  }) {
    super({ platform, filterExistentsJobs });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({});
    this.log('Start');

    const urls = await this.getUrls(page);
    this.log(`Scraped jobs: ${urls?.length}`);
    const existentJobs =
      await JobOpportunityController.getAllJobsFromPlatform(platform);
    const existentJobsIds = existentJobs?.map((cur) => cur?.idInPlatform);
    const filteredUrls = this.filterExistentsJobs
      ? urls?.filter((cur) => !existentJobsIds?.includes(cur?.idInPlatform))
      : urls;
    this.log(`Filtered jobs: ${filteredUrls?.length}`);

    const jobs: JobInput[] = await this.getDetails(page, filteredUrls);

    await browser.close();

    this.log('End');
    return jobs;
  }

  private async getUrls(page: Page): Promise<JobInitialData[]> {
    const result: JobInitialData[] = [];
    for (const url of REMOTEROCKETSHIP_URLS) {
      try {
        await page.goto(url);

        const urls: string[] = await page?.$$eval('h3 > a', (el) =>
          el?.map((cur) => cur?.href),
        );
        result?.push(
          ...urls?.map((url) => ({
            url,
            idInPlatform: url?.split('empresa/')?.[1]?.split('/')?.[1],
          })),
        );
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

        const title = await page?.$eval(
          'h1',
          (el) => el?.innerText,
        );
        const company = await page.$eval(
          'h2.text-lg.font-semibold.text-center.text-primary.mb-1.mt-2',
          (el) => el?.innerText,
        );
        const description = await page?.$eval(
          'div.bg-primary.flex.flex-col.items-start.rounded-lg.p-4.border-subtle',
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
}
