import { Page } from "puppeteer";
import JobOpportunityController from "../controllers/JobOpportunity.controller";
import ScraperInterface from "./ScraperInterface";
import { analyzeDescription, getProgramathorNormalizedSkill } from "../analyzer/analyzer";
import { JobInitialData, JobInput, JobPlatform } from "../@types/types";
import { PROGRAMATHOR_URLS } from "../urls/urls";

const platform: JobPlatform = JobPlatform.PROGRAMATHOR
export default class ProgramathorScraper extends ScraperInterface {
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
    for (const url of PROGRAMATHOR_URLS) {
      try {
        await page.goto(url);
        const urls: string[] = await page?.$$eval('div.cell-list > a', (el) => el?.map(cur => cur?.href));
        result?.push(...urls?.map(url => ({ url, idInPlatform: url?.split('jobs/')?.[1]?.split('-')?.[0] })));
      } catch (e) {
        this.logError(e);
        continue;
      }
    }
    return result;
  }

  private async getDetails(page: Page, urls: JobInitialData[]): Promise<JobInput[]> {
    const urlsLength = urls?.length;
    const jobs: JobInput[] = [];
    for (let i = 0; i < urlsLength; i++) {
      try {
        const obj = urls[i]
        await page.goto(obj?.url);

        try {
          const expired = await page.$eval('span.text-16.border-red.border-radius-4.padding-xs-full.color-red', (el) => el?.innerText);
          if (!!expired) continue;
        } catch { }

        const title = await page?.$eval('div.container > h1', (el) => el?.innerText);
        const programathorSkills = await page?.$$eval('div.container > a > span', (el) => el?.map(cur => cur?.innerText));
        const normalizedSkills = programathorSkills?.map(cur => getProgramathorNormalizedSkill(cur));
        const company = await page?.$eval('div.wrapper-content-job-show > h2', (el) => el?.innerText);
        const infoArray: string[] = await page?.$$eval('div.wrapper-content-job-show', (el) => el?.map(cur => cur?.innerText));
        const descriptionOriginal = await page?.$$eval('div.line-height-2-4', (el) => el?.map(cur => cur?.innerText)?.join('\n\n'));
        const analyzerResponse = analyzeDescription({ title, description: infoArray?.join('\n') + descriptionOriginal, skills: normalizedSkills });

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