import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './ScraperInterface';

const platform: JobPlatform = JobPlatform.COODESH;

export default class CoodeshScraper extends ScraperInterface {
  constructor({
    filterExistentsJobs = true,
  }: {
    filterExistentsJobs?: boolean;
  }) {
    super({ platform, filterExistentsJobs });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({
      abortScript: true,
      abortStyle: true,
    });
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
      await page.goto('https://coodesh.com/jobs?skills=reactjs', {
        waitUntil: 'networkidle0',
      });
      const urls: string[] = await page?.$$eval('a.card', (el) =>
        el?.map((cur) => cur?.href),
      );

      const result: JobInitialData[] = urls?.map((url) => {
        const url1 = url?.split('?')?.[0];
        return {
          url,
          idInPlatform: url1?.split('-')?.[url1?.split('-')?.length - 1],
        };
      });

      return result;
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
        const company = await page?.$eval('span.h4', (el) => el?.innerText);
        const info: string[] = await page?.$$eval(
          'div.media-body > span',
          (el) => el?.map((cur) => cur?.innerText),
        );
        const location = info
          ?.find((cur) => cur?.includes(' em '))
          ?.split('em')?.[1]
          ?.split(',');
        const descriptionOriginal = await page?.$$eval(
          'div.styleJobDescription',
          (el) => el?.map((cur) => cur?.innerText)?.join('\n\n'),
        );
        const analyzerResponse = analyzeDescription({
          title,
          description: info?.join(', ') + descriptionOriginal,
        });

        jobs?.push({
          title,
          company,
          city: location?.[0]?.trim(),
          state: location?.[1]?.trim(),
          country: location?.[2]?.trim(),
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
