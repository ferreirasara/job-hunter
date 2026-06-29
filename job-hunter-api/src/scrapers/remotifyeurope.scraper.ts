import { uniq } from 'lodash';
import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './scraperInterface';
import { sleep } from '../utils/utils';

const platform: JobPlatform = JobPlatform.REMOTIFYEUREPE;

export default class RemotifyEuropeScraper extends ScraperInterface {
  constructor({
    filterExistentsJobs = true,
  }: {
    filterExistentsJobs?: boolean;
  }) {
    super({ platform, filterExistentsJobs });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({ abortStyle: false, abortScript: false });
    this.logMessage('Start');

    const urls = await this.getUrls(page);
    this.logMessage(`Scraped jobs: ${urls?.length}`);
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform(
      this.platform,
    );
    const existentJobsIds = existentJobs?.map((cur) => cur?.idInPlatform);
    const filteredUrls = this.filterExistentsJobs
      ? urls?.filter((cur) => !existentJobsIds?.includes(cur?.idInPlatform))
      : urls;
    this.logMessage(`Filtered jobs: ${filteredUrls?.length}`);

    const jobs = await this.getDetails(page, filteredUrls);
    await browser.close();

    this.logMessage('End');
    return jobs;
  }

  private async getUrls(page: Page) {
    try {
      await page.goto('https://remotifyeurope.com/remote-jobs');

      await page.type('input#title', 'frontend');
      await sleep(1000);
      const frontendUrls: string[] = await page?.$$eval(
        'a.w-full.flex.flex-col.items-center.justify-center',
        (el) => el?.map((cur) => cur?.href),
      );

      await page.type('input#title', 'react');
      await sleep(1000);
      const reactUrls: string[] = await page?.$$eval(
        'a.w-full.flex.flex-col.items-center.justify-center',
        (el) => el?.map((cur) => cur?.href),
      );

      const allUrls: string[] = uniq([...frontendUrls, ...reactUrls]);
      const urls: JobInitialData[] = uniq(allUrls)?.map((url) => ({
        url,
        idInPlatform: url?.split('/listing/')?.[1],
      }));

      const existentJobs =
        await JobOpportunityController.getAllJobsFromPlatform(this.platform);
      const existentJobsIds = existentJobs?.map((cur) => cur?.idInPlatform);
      const filteredUrls = this.filterExistentsJobs
        ? urls?.filter((cur) => !existentJobsIds?.includes(cur?.idInPlatform))
        : urls;

      return filteredUrls;
    } catch (e) {
      this.logError(e);
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
        this.logError(e);
        continue;
      }
    }

    return jobs;
  }
}
