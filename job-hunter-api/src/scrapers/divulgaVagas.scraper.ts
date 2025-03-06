import { uniq } from 'lodash';
import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './ScraperInterface';

const platform: JobPlatform = JobPlatform.DIVULGA_VAGAS;
export default class DivulgaVagasScraper extends ScraperInterface {
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
      await page.goto('https://www.divulgavagas.com.br/vagas-de-emprego/');
      await page.type('input.form-control', 'frontend');
      await page.click('button.btn');
      await page.waitForSelector('h5.card-title > a');
      const frontendUrls: string[] = await page?.$$eval(
        'h5.card-title > a',
        (el) => el?.map((cur) => cur?.href),
      );

      await page.goto('https://www.divulgavagas.com.br/vagas-de-emprego/');
      await page.type('input.form-control', 'react');
      await page.click('button.btn');
      await page.waitForSelector('h5.card-title > a');
      const reactUrls: string[] = await page?.$$eval(
        'h5.card-title > a',
        (el) => el?.map((cur) => cur?.href),
      );

      await page.goto('https://www.divulgavagas.com.br/vagas-de-emprego/');
      await page.type('input.form-control', 'desenvolvedor');
      await page.click('button.btn');
      await page.waitForSelector('h5.card-title > a');
      const developerUrls: string[] = await page?.$$eval(
        'h5.card-title > a',
        (el) => el?.map((cur) => cur?.href),
      );

      const allUrls = [...frontendUrls, ...reactUrls, ...developerUrls];
      const urls = uniq(allUrls);

      const result: JobInitialData[] = urls?.map((url) => ({
        url,
        idInPlatform: url?.split('-')?.[url?.split('-')?.length - 1],
      }));

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
        const location: string = await page?.$eval(
          'div.media > div > span',
          (el) => el?.innerText,
        );
        const company = await page?.$eval(
          'div.media > div > div > span',
          (el) => el?.innerText,
        );
        const descriptionOriginal = await page?.$eval(
          'div.row',
          (el) => el?.innerText,
        );
        const analyzerResponse = analyzeDescription({
          title,
          description: descriptionOriginal,
        });

        jobs?.push({
          title,
          company,
          city: location?.split('-')?.[0]?.trim(),
          state: location?.split('-')?.[1]?.trim(),
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
