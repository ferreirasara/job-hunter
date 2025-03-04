import { uniq } from 'lodash';
import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './ScraperInterface';

const platform: JobPlatform = JobPlatform.REMOTAR;

export default class RemotarScraper extends ScraperInterface {
  constructor({
    filterExistentsJobs = true,
  }: {
    filterExistentsJobs?: boolean;
  }) {
    super({ platform, filterExistentsJobs });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({ abortScript: false });
    this.logMessage('Start');

    const urls = await this.getUrls(page);
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform(
      this.platform,
    );
    const existentJobsIds = existentJobs?.map((cur) => cur?.idInPlatform);
    const filteredUrls = this.filterExistentsJobs
      ? urls?.filter((cur) => !existentJobsIds?.includes(cur?.idInPlatform))
      : urls;

    const jobs = await this.getDetails(page, filteredUrls);
    await browser.close();

    this.logMessage('End');
    return jobs;
  }

  private async getUrls(page: Page) {
    try {
      await page.goto('https://remotar.com.br/search/jobs?q=frontend', {
        waitUntil: 'networkidle2',
      });
      const frontendUrls: string[] = await page?.$$eval(
        'div.featured > a',
        (el) => el?.map((cur) => cur?.href),
      );

      await page.goto('https://remotar.com.br/search/jobs?q=front%20end', {
        waitUntil: 'networkidle2',
      });
      const frontend2Urls: string[] = await page?.$$eval(
        'div.featured > a',
        (el) => el?.map((cur) => cur?.href),
      );

      await page.goto('https://remotar.com.br/search/jobs?q=react', {
        waitUntil: 'networkidle2',
      });
      const reactUrls: string[] = await page?.$$eval('div.featured > a', (el) =>
        el?.map((cur) => cur?.href),
      );

      const allUrls = [...frontendUrls, ...frontend2Urls, ...reactUrls];
      const urls: JobInitialData[] = uniq(allUrls)?.map((url) => ({
        url,
        idInPlatform: url?.split('job/')?.[1]?.split('/')?.[0],
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
