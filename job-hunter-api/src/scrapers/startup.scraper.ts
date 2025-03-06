import { uniq } from 'lodash';
import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './ScraperInterface';

const platform: JobPlatform = JobPlatform.STARTUP;
const TOTAL_PAGES = 5;

export default class StartupScraper extends ScraperInterface {
  constructor({
    filterExistentsJobs = true,
  }: {
    filterExistentsJobs?: boolean;
  }) {
    super({ platform, filterExistentsJobs });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({});
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
      const urls: JobInitialData[] = [];

      for (let pageNumber = 1; pageNumber <= TOTAL_PAGES; pageNumber++) {
        await page.goto(
          `https://startup.jobs/remote-jobs?q=frontend&remote=true&page=${pageNumber}`,
        );
        const frontendUrls: string[] = await page?.$$eval(
          'div.flex.flex-col.justify-center > a',
          (el) => el?.map((cur) => cur?.href),
        );

        await page.goto(
          `https://startup.jobs/remote-jobs?q=react&remote=true&page=${pageNumber}`,
        );
        const reactUrls: string[] = await page?.$$eval(
          'div.flex.flex-col.justify-center > a',
          (el) => el?.map((cur) => cur?.href),
        );

        const allUrls = [...frontendUrls, ...reactUrls];
        urls.push(
          ...uniq(allUrls)?.map((url) => {
            const urlSplit = url?.split('-');
            return {
              url,
              idInPlatform: urlSplit?.[urlSplit?.length - 1],
            };
          }),
        );
      }

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
        await page.goto(obj?.url);
        const title = await page?.$eval('h1', (el) => el?.innerText);
        const company = await page?.$eval('a.font-bold', (el) => el?.innerText);
        const location = await page?.$$eval('div.block > a', (el) =>
          el?.map((cur) => cur?.innerText),
        );

        const descriptionOriginal = await page?.$eval(
          'div.trix-content',
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
          yearsOfExperience: analyzerResponse?.yearsOfExperience,
        });
      } catch (e) {
        this.logError(e);
        continue;
      }
    }

    return jobs;
  }
}
