import { uniq } from 'lodash';
import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './ScraperInterface';

const platform: JobPlatform = JobPlatform.SOLIDES;

export default class SolidesScraper extends ScraperInterface {
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

      let totalPages = 100;
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        await page.goto(
          `https://vagas.solides.com.br/vagas/todos/frontend?jobsType=remoto&occupationAreas=tecnologia&page=${pageNumber}`,
          { waitUntil: 'networkidle0' },
        );
        const totalJobs = parseInt((await page?.$eval('strong.font-semibold.text-body2.text-gray-500', (el) => el.innerText))?.split(' ')[0]);
        totalPages = Math.ceil(totalJobs / 14);

        const jobsUrls: string[] = await page?.$$eval(
          'a.mt-auto.w-full.py-2.bg-primary.text-white.text-center.font-bold.text-body2.shadow-sm.rounded-md.transition-all.duration-300',
          (el) => el?.map((cur) => cur?.href),
        );

        urls.push(
          ...uniq(jobsUrls)?.map((url) => {
            const urlSplit = url?.split('/');
            return {
              url,
              idInPlatform: urlSplit?.[4],
            };
          }),
        );
      }

      totalPages = 100;
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        await page.goto(
          `https://vagas.solides.com.br/vagas/todos/react?jobsType=remoto&occupationAreas=tecnologia&page=${pageNumber}`,
          { waitUntil: 'networkidle0' },
        );
        const totalJobs = parseInt((await page?.$eval('strong.font-semibold.text-body2.text-gray-500', (el) => el.innerText))?.split(' ')[0]);
        totalPages = Math.ceil(totalJobs / 14);

        const jobsUrls: string[] = await page?.$$eval(
          'a.mt-auto.w-full.py-2.bg-primary.text-white.text-center.font-bold.text-body2.shadow-sm.rounded-md.transition-all.duration-300',
          (el) => el?.map((cur) => cur?.href),
        );

        urls.push(
          ...uniq(jobsUrls)?.map((url) => {
            const urlSplit = url?.split('/');
            return {
              url,
              idInPlatform: urlSplit?.[4],
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
        await page.goto(obj?.url, { waitUntil: 'networkidle2' });
        const title = await page?.$eval('h1.text-subtitle1.font-semibold', (el) => el?.innerText);
        const company = await page?.$eval(
          'a.text-subtitle2',
          (el) => el?.innerText,
        );
        const location = (await page?.$eval(
          'div.flex.flex-wrap.items-center.gap-x-6.gap-y-3.text-gray-900 > p:nth-child(1)',
          (el) => el?.innerText,
        ))?.split(' - ');

        const descriptionOriginal = (await page?.$$eval(
          'section.px-4',
          (el) => el?.map((cur) => cur?.innerText),
        ))?.join('\n\n');
        const analyzerResponse = analyzeDescription({
          title,
          description: descriptionOriginal,
        });

        jobs?.push({
          title,
          company,
          city: location?.[0],
          state: location?.[1],
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
        this.logError(e, urls[i]?.url);
        continue;
      }
    }

    return jobs;
  }
}
