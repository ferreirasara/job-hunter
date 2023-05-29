import puppeteer, { Page } from "puppeteer";
import JobOpportunityController, { JobInitialData, JobInput, JobPlatform, JobType } from "../controllers/JobOpportunity.controller";
import ScraperInterface from "./scraperInterface";

type ProgramathorJob = {
  title: string,
  company: string,
  skills: string[],
  description: string,
  url: string,
  idInPlatform: string,
  salaryRange?: string,
  type: JobType,
}

const platform: JobPlatform = "PROGRAMATHOR"

export default class ProgramathorScraper extends ScraperInterface {
  constructor() { super({ platform }) }

  public async getJobs(filterExistentsJobs?: boolean): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser();
    this.logMessage("Start");

    const urls = await this.getUrls(page);
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform("PROGRAMATHOR");
    const existentJobsIds = existentJobs?.map(cur => cur?.idInPlatform);
    const filteredUrls = filterExistentsJobs ? urls?.filter(cur => !existentJobsIds?.includes(cur?.idInPlatform)) : urls;

    const jobs: JobInput[] = await this.getDetails(page, filteredUrls);

    await browser.close();

    this.logMessage("End");
    return jobs;
  }

  private async getUrls(page: Page): Promise<JobInitialData[]> {
    try {
      await page.goto("https://programathor.com.br/jobs-front-end");
      const urls: string[] = await page?.$$eval('div.cell-list > a', (el) => el?.map(cur => cur?.href));
      const result: JobInitialData[] = urls?.map(url => ({ url, idInPlatform: url?.split('jobs/')?.[1]?.split('-')?.[0] }))
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
        const title = await page?.$eval('div.container > h1', (el) => el?.innerText);
        const skills = await page?.$$eval('div.container > a > span', (el) => el?.map(cur => cur?.innerText));
        const company = await page?.$eval('div.wrapper-content-job-show > h2', (el) => el?.innerText);
        const description = await page?.$$eval('div.line-height-2-4', (el) => el?.map(cur => cur?.innerText)?.join('\n\n'));
        const infoArray: string[] = await page?.$$eval('div.col-md-7.col-md-9 > div.row > div', (el) => el?.map(cur => cur?.innerText));
        const salaryRange = infoArray?.find(cur => cur?.toLowerCase()?.includes("salário"))?.split('Salário: ')?.[1];
        const typeString = infoArray?.find(cur => cur?.toLowerCase()?.includes("remoto"));
        const type: JobType = typeString?.includes('Sim') ? "REMOTE" : "FACE_TO_FACE";

        jobs?.push({
          title,
          skills: skills?.join(', '),
          company,
          description: description.replace(/\n+/g, '\n'),
          url: obj?.url,
          idInPlatform: obj?.idInPlatform,
          salaryRange,
          type,
          platform: this.platform,
        });
      } catch (e) {
        this.logError(e);
        continue;
      }
    }

    return jobs;
  }

}