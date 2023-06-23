import { Page } from "puppeteer";
import JobOpportunityController, { JobInitialData, JobInput, JobPlatform, JobType } from "../controllers/JobOpportunity.controller";
import ScraperInterface from "./ScraperInterface";
import { getBenefitsBasedOnDescription, getHiringRegimeBasedOnDescription, getProgramathorNormalizedSkill, getRatingsBasedOnSkillsAndBenefits, getSkillsBasedOnDescription, getTypeBasedOnDescription } from "../analyzer/analyzer";

type ProgramathorJob = {
  title: string,
  company: string,
  skills: string[],
  description: string,
  url: string,
  idInPlatform: string,
  type: JobType,
}

const platform: JobPlatform = "PROGRAMATHOR"

export default class ProgramathorScraper extends ScraperInterface {
  constructor({ filterExistentsJobs }: { filterExistentsJobs?: boolean }) {
    super({ platform, filterExistentsJobs })
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({});
    this.logMessage("Start");

    const urls = await this.getUrls(page);
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform("PROGRAMATHOR");
    const existentJobsIds = existentJobs?.map(cur => cur?.idInPlatform);
    const filteredUrls = this.filterExistentsJobs ? urls?.filter(cur => !existentJobsIds?.includes(cur?.idInPlatform)) : urls;

    const jobs: JobInput[] = await this.getDetails(page, filteredUrls);

    await browser.close();

    this.logMessage("End");
    return jobs;
  }

  private async getUrls(page: Page): Promise<JobInitialData[]> {
    try {
      await page.goto("https://programathor.com.br/jobs-front-end");
      const urls: string[] = await page?.$$eval('div.cell-list > a', (el) => el?.map(cur => cur?.href));
      const result: JobInitialData[] = urls?.map(url => ({ url, idInPlatform: url?.split('jobs/')?.[1]?.split('-')?.[0] }));
      return result;
    } catch (e) {
      this.logError(e);
      return [];
    }
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
        const descriptionOriginal = await page?.$$eval('div.line-height-2-4', (el) => el?.map(cur => cur?.innerText)?.join('\n\n'));
        let description = descriptionOriginal;

        const skillsResponse = getSkillsBasedOnDescription({ description, skills: normalizedSkills });
        description = skillsResponse?.description;

        const benefitsResponse = getBenefitsBasedOnDescription({ description });
        description = benefitsResponse?.description;

        const { benefitsRating, skillsRating } = getRatingsBasedOnSkillsAndBenefits({ skills: skillsResponse?.skills, benefits: benefitsResponse?.benefits });
        const hiringRegime = getHiringRegimeBasedOnDescription({ description });
        const infoArray: string[] = await page?.$$eval('div.col-md-7.col-md-9 > div.row > div', (el) => el?.map(cur => cur?.innerText));
        const homeOffice = infoArray?.find(cur => cur?.toLowerCase()?.includes("home office"));
        const type: JobType = !!homeOffice ? "REMOTE" : getTypeBasedOnDescription({ description });

        jobs?.push({
          title,
          company,
          description: description.replace(/\n+/g, '\n'),
          url: obj?.url,
          idInPlatform: obj?.idInPlatform,
          type,
          platform: this.platform,
          skills: skillsResponse?.skills?.join(', '),
          benefits: benefitsResponse?.benefits?.join(', '),
          benefitsRating,
          skillsRating,
          hiringRegime,
        });
      } catch (e) {
        this.logError(e);
        continue;
      }
    }

    return jobs;
  }

}