import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import { LINKEDIN_URLS } from '../urls/urls';
import { sleep } from '../utils/utils';
import ScraperInterface from './ScraperInterface';

const platform: JobPlatform = JobPlatform.LINKEDIN;
export default class LinkedinScraper extends ScraperInterface {
  constructor({
    filterExistentsJobs = true,
  }: {
    filterExistentsJobs?: boolean;
  }) {
    super({ platform, filterExistentsJobs });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({
      abortScript: false,
      abortStyle: false,
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
    const result: JobInitialData[] = [];
    for (const url of LINKEDIN_URLS) {
      try {
        await page.goto(url);
        const totalOfJobs = await page?.$eval(
          'span.results-context-header__job-count',
          (el) => parseInt(el?.innerText),
        );

        for (let i = 0; i < totalOfJobs / 25; i++) {
          await sleep(500);
          for (let keyPressed = 0; keyPressed <= 10; keyPressed++) {
            await page?.keyboard?.press('PageDown');
          }
          await page?.waitForNetworkIdle();
        }

        const urls: string[] = await page?.$$eval(
          'a.base-card__full-link',
          (el) => el?.map((cur) => cur?.href),
        );
        result?.push(
          ...urls?.map((url) => {
            const urlSplit = url?.split('?')?.[0]?.split('-');
            return { url, idInPlatform: urlSplit?.[urlSplit?.length - 1] };
          }),
        );
      } catch (e) {
        this.logError(e);
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
        await sleep(500);
        await page.goto(obj?.url, { waitUntil: 'networkidle0', timeout: 2000 });
        const title: string = await page?.$eval(
          'h1.top-card-layout__title',
          (el) => el?.innerText,
        );
        const company: string = await page?.$eval(
          'span.topcard__flavor',
          (el) => el?.innerText,
        );
        if (
          company?.toLowerCase() === 'programathor' ||
          company?.toLowerCase() === 'geekuunter'
        )
          continue;
        const descriptionOriginal: string = await page?.$$eval(
          'div.description__text',
          (el) => el?.map((cur) => cur?.innerText)?.join('\n\n'),
        );
        const analyzerResponse = analyzeDescription({
          title,
          description: descriptionOriginal,
        });

        jobs?.push({
          title,
          company: company?.trim(),
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
        if (
          !JSON.stringify(e)?.includes('failed to find element') &&
          !JSON.stringify(e)?.includes('TimeoutError')
        )
          this.logError(e);
        continue;
      }
    }

    return jobs;
  }
}
