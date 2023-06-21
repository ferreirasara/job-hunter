import { Page } from "puppeteer";
import JobOpportunityController, { JobInitialData, JobInput, JobType, JobPlatform } from "../controllers/JobOpportunity.controller";
import ScraperInterface from "./ScraperInterface";
import { getBenefitsBasedOnDescription, getHiringRegimeBasedOnDescription, getRatingsBasedOnSkillsAndBenefits, getSkillsBasedOnDescription, getTypeBasedOnDescription } from "../analyzer/analyzer";

const platform: JobPlatform = "TRAMPOS"

export default class TramposScraper extends ScraperInterface {
  constructor({ filterExistentsJobs }: { filterExistentsJobs?: boolean }) {
    super({ platform, filterExistentsJobs })
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({ abortScript: false });
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
      await page.goto("https://trampos.co/oportunidades/?ct[]=programacao&tp[]=emprego&tp[]=freela", { waitUntil: "domcontentloaded" });

      await page.waitForSelector('p.paging');
      const totalOfPages = await page.$eval('p.paging', el => parseInt(el?.innerText?.split(' de ')?.[1]))

      for (let i = 0; i < totalOfPages - 1; i++) {
        await page.waitForSelector('a.btn.btn-lg.btn-success');
        await page.click('a.btn.btn-lg.btn-success');
      }

      const urls: string[] = await page?.$$eval('a.ember-view', (el) => el?.map(cur => cur?.href));
      const result: JobInitialData[] = urls?.map(url => ({ url, idInPlatform: url?.split('oportunidades/')?.[1]?.split('?')?.[0] }));

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
        const title = await page?.$eval('div.opportunity > h1.name', (el) => el?.innerText);
        const company = await page?.$eval('div.opportunity > p.address', (el) => el?.innerText?.split(' | ')?.[0]);
        const address: string = await page?.$eval('div.opportunity > p.address', (el) => el?.innerText?.split(' | ')?.[1]);
        const description = await page?.$eval('div.opportunity > div.description', (el) => el?.innerText);
        const type = this.getType(address, description);
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
          city: address?.split(' - ')?.[1]?.split(', ')?.[0],
          state: address?.split(' - ')?.[1]?.split(', ')?.[1],
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

  private getType(address: string, description: string): JobType {
    if (address?.toLowerCase()?.includes('home office')) return "REMOTE";
    if (address?.toLowerCase()?.includes('remoto')) return "REMOTE";
    if (address?.toLowerCase()?.includes('hibrido')) return "HYBRID";
    return getTypeBasedOnDescription({ description });
  }
}