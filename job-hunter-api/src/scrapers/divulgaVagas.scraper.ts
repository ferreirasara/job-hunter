import { uniq } from 'lodash';
import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './scraperInterface';

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
      await page.goto('https://divulgavagas.com.br/vagas-de-frontend/');
      let frontendUrls: string[] = [];
      try {
        await page.waitForSelector('div.vaga-titulo-text > a');
        frontendUrls = await page?.$$eval('div.vaga-titulo-text > a', (el) =>
          el?.map((cur) => cur?.href),
        );
      } catch (e) {
        this.logMessage('No frontend jobs found');
      }

      await page.goto('https://divulgavagas.com.br/vagas-de-react/');
      let reactUrls: string[] = [];
      try {
        await page.waitForSelector('div.vaga-titulo-text > a');
        reactUrls = await page?.$$eval('div.vaga-titulo-text > a', (el) =>
          el?.map((cur) => cur?.href),
        );
      } catch (e) {
        this.logMessage('No react jobs found');
      }

      await page.goto('https://divulgavagas.com.br/vagas-de-desenvolvedor/');
      let developerUrls: string[] = [];
      try {
        await page.waitForSelector('div.vaga-titulo-text > a');
        developerUrls = await page?.$$eval('div.vaga-titulo-text > a', (el) =>
          el?.map((cur) => cur?.href),
        );
      } catch (e) {
        this.logMessage('No developer jobs found');
      }

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
          'div.job-company-section > div.job-info-grid > div.job-info-item',
          (el) => el?.innerText,
        );
        const company = (
          await page?.$eval('div.job-company-name', (el) => el?.innerText)
        )?.trim();
        const descriptionOriginal = (
          await page?.$$eval('section.job-card', (el) =>
            el?.map((cur) => cur?.innerText),
          )
        )?.join('\n\n');
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
