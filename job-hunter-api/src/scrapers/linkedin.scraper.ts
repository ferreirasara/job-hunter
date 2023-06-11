import { Page } from "puppeteer";
import JobOpportunityController, { JobInitialData, JobInput, JobPlatform, JobType } from "../controllers/JobOpportunity.controller";
import ScraperInterface from "./scraperInterface";
import { getBenefitsBasedOnDescription, getHiringRegimeBasedOnDescription, getRatingsBasedOnSkillsAndBenefits, getSkillsBasedOnDescription, getTypeBasedOnDescription } from "../analyzer/analyzer";
import { LINKEDIN_URLS } from "../urls/linkedinUrls";

const platform: JobPlatform = "LINKEDIN"

export default class LinkedinScraper extends ScraperInterface {
  constructor({ filterExistentsJobs }: { filterExistentsJobs?: boolean }) {
    super({ platform, filterExistentsJobs })
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser(true);
    this.logMessage("Start");

    const urls = await this.getUrls(page);
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform(this.platform);
    const existentJobsIds = existentJobs?.map(cur => cur?.idInPlatform);
    const filteredUrls = this.filterExistentsJobs ? urls?.filter(cur => !existentJobsIds?.includes(cur?.idInPlatform)) : urls;

    const jobs = await this.getDetails(page, filteredUrls);
    await browser.close();

    this.logMessage("End");
    return jobs;
  }

  private async getUrls(page: Page) {
    try {
      const urls = LINKEDIN_URLS;
      const result: JobInitialData[] = urls?.map(url => ({ url, idInPlatform: url?.split('view/')?.[1]?.split('/')?.[0] }));
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
        await page.goto(obj?.url, { waitUntil: "domcontentloaded" });
        const title: string = await page?.$eval('h1.top-card-layout__title', (el) => el?.innerText);
        const company: string = await page?.$eval('span.topcard__flavor', (el) => el?.innerText);
        const description: string = await page?.$$eval('div.description__text', (el) => el?.map(cur => cur?.innerText)?.join('\n\n'));
        const type: JobType = getTypeBasedOnDescription({ description });
        const skills = getSkillsBasedOnDescription({ description });
        const benefits = getBenefitsBasedOnDescription({ description });
        const { benefitsRating, skillsRating } = getRatingsBasedOnSkillsAndBenefits({ skills, benefits });
        const hiringRegime = getHiringRegimeBasedOnDescription({ description });

        jobs?.push({
          title,
          company: company?.trim(),
          description: description.replace(/\n+/g, '\n'),
          url: obj?.url,
          idInPlatform: obj?.idInPlatform,
          type,
          platform: this.platform,
          skills: skills?.join(', '),
          benefits: benefits?.join(', '),
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