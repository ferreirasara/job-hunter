import { Page } from "puppeteer";
import JobOpportunityController, { JobInitialData, JobInput, JobPlatform, JobType } from "../controllers/JobOpportunity.controller";
import ScraperInterface from "./ScraperInterface";
import { getBenefitsBasedOnDescription, getHiringRegimeBasedOnDescription, getRatingsBasedOnSkillsAndBenefits, getSkillsBasedOnDescription } from "../analyzer/analyzer";
import { uniq } from "lodash";

const platform: JobPlatform = "REMOTAR"

export default class RemotarScraper extends ScraperInterface {
  constructor({ filterExistentsJobs }: { filterExistentsJobs?: boolean }) {
    super({ platform, filterExistentsJobs })
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({});
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
      await page.goto("https://remotar.com.br/search/jobs?q=frontend", { waitUntil: "networkidle0" });
      const frontendUrls: string[] = await page?.$$eval('div.featured > a', (el) => el?.map(cur => cur?.href));

      await page.goto("https://remotar.com.br/search/jobs?q=react", { waitUntil: "networkidle0" });
      const reactUrls: string[] = await page?.$$eval('div.featured > a', (el) => el?.map(cur => cur?.href));

      const allUrls = [...frontendUrls, ...reactUrls];
      const urls = uniq(allUrls);

      const result: JobInitialData[] = urls?.map(url => ({ url, idInPlatform: url?.split('job/')?.[1]?.split('/')?.[0] }));

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
        const title = await page?.$eval('h1.job-title', (el) => el?.innerText);
        const company = await page?.$eval('p.h2', (el) => el?.innerText);
        const description = await page?.$$eval('div.job-info-box', (el) => el?.map(cur => cur?.innerText)?.join('\n\n'));
        const type: JobType = "REMOTE";
        const skills = getSkillsBasedOnDescription({ description });
        const benefits = getBenefitsBasedOnDescription({ description });
        const { benefitsRating, skillsRating } = getRatingsBasedOnSkillsAndBenefits({ skills, benefits });
        const hiringRegime = getHiringRegimeBasedOnDescription({ description });

        jobs?.push({
          title,
          company,
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