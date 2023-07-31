import { Page } from "puppeteer";
import JobOpportunityController from "../controllers/JobOpportunity.controller";
import ScraperInterface from "./ScraperInterface";
import { analyzeDescription } from "../analyzer/analyzer";
import { JobInitialData, JobInput, JobPlatform } from "../@types/types";
import { JOBATUS_URLS } from "../urls/urls";
import { uniqBy } from "lodash";

const platform: JobPlatform = JobPlatform.JOBATUS
export default class JObatusScraper extends ScraperInterface {
  constructor({ filterExistentsJobs }: { filterExistentsJobs?: boolean }) {
    super({ platform, filterExistentsJobs })
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({});
    this.logMessage("Start");

    const urls = await this.getUrls(page);
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform(platform);
    const existentJobsIds = existentJobs?.map(cur => cur?.idInPlatform);
    const filteredUrls = this.filterExistentsJobs ? urls?.filter(cur => !existentJobsIds?.includes(cur?.idInPlatform)) : urls;

    const jobs: JobInput[] = await this.getDetails(page, filteredUrls);

    await browser.close();

    this.logMessage("End");
    return jobs;
  }

  private async getUrls(page: Page): Promise<JobInitialData[]> {
    const result: JobInitialData[] = []
    for (const url of JOBATUS_URLS) {
      try {
        await page.goto(url);
        const urls: string[] = await page?.$$eval('p.jobtitle > a', (el) => el?.map(cur => cur?.href));
        result?.push(...urls?.map(url => ({ url, idInPlatform: url?.split('-')?.[url?.split('-')?.length - 1] })));
      } catch (e) {
        this.logError(e);
        continue;
      }
    }
    return uniqBy(result, 'idInPlatform');
  }

  private async getDetails(page: Page, urls: JobInitialData[]): Promise<JobInput[]> {
    const urlsLength = urls?.length;
    const jobs: JobInput[] = [];
    for (let i = 0; i < urlsLength; i++) {
      try {
        const obj = urls[i]
        await page.goto(obj?.url);

        const title = await page?.$eval('#offer_title', (el) => el?.innerText);
        const infoArray: string[] = await page?.$$eval('span.detail_body', (el) => el?.map(cur => cur?.innerText));
        const company = infoArray?.[0];
        const city = infoArray?.[0]?.split('-')?.[0]?.trim();
        const state = infoArray?.[0]?.split('-')?.[1]?.trim();
        const descriptionOriginal = await page?.$eval('#description_body', (el) => el?.innerText);
        const analyzerResponse = analyzeDescription({ title, description: descriptionOriginal });

        jobs?.push({
          title,
          company,
          city,
          state,
          description: analyzerResponse?.description,
          url: obj?.url,
          idInPlatform: obj?.idInPlatform,
          type: analyzerResponse?.type,
          platform: this.platform,
          skills: analyzerResponse?.skills?.join(', '),
          benefits: analyzerResponse?.benefits?.join(', '),
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