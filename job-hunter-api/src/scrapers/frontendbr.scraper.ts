import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './scraperInterface';
import { uniq } from 'lodash';

const platform: JobPlatform = JobPlatform.FRONTENDBR;

export default class FrontendBrScraper extends ScraperInterface {
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
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform(
      this.platform,
    );
    const existentJobsIds = existentJobs?.map((cur) => cur?.idInPlatform);
    const filteredUrls = this.filterExistentsJobs
      ? urls?.filter((cur) => !existentJobsIds?.includes(cur?.idInPlatform))
      : urls;
    this.log(`Filtered jobs: ${filteredUrls?.length}`);

    const jobs: JobInput[] = await this.getDetails(page, filteredUrls.slice(0, 1));
    await browser.close();

    this.log('End');
    return jobs;
  }

  private async getUrls(page: Page) {
    try {
      await page.goto('https://frontendbr.com/');
      const urls: string[] = await page?.$$eval('a.text-sm.font-medium.text-primary.underline-offset-4', (el) =>
        el?.map((cur) => cur?.href),
      );

      const result: JobInitialData[] = urls?.map((url) => ({
        url,
        idInPlatform: url?.split('vagas/')?.[1]?.split('/')?.[0],
      }));

      return result;
    } catch (e) {
      this.log(e, { error: true });
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
        await page.goto(obj?.url, { waitUntil: 'networkidle0' });
        const title = await page?.$eval('h1', (el) => el?.innerText);
        const company = await page?.$eval('span.font-medium.flex.gap-2.items-center', (el) => el?.innerText);
        const description = await page?.$$eval(
          'div.markdown-body',
          (el) => el?.map((cur) => cur?.innerText)?.join('\n\n'),
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
