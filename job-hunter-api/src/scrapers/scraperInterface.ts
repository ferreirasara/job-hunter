import puppeteer from "puppeteer";
import JobOpportunityController, { JobInput, JobPlatform } from "../controllers/JobOpportunity.controller";
import { interceptRequest } from "../utils/utils";

export default abstract class ScraperInterface {
  protected platform: JobPlatform

  constructor({ platform }: { platform: JobPlatform }) {
    this.platform = platform;
  }

  public abstract getJobs(filterExistentsJobs: boolean): Promise<JobInput[]>

  protected async getBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', interceptRequest);

    return { browser, page }
  }

  protected async logError(e: any) {
    console.log(`[${this.platform}] Error: ${JSON.stringify(e)}`);
  }

  protected async logMessage(message: string) {
    console.log(`[${this.platform}] ${message}`);
  }

  public async saveJobs(): Promise<number> {
    const jobs = await this.getJobs(true);
    const jobsLength = jobs?.length;
    console.log(`[${this.platform}] there are ${jobsLength} new jobs to save!`);
    let jobsSavedCount = 0;

    for (let i = 0; i < jobsLength; i++) {
      const job = jobs?.[i];
      const uuid = await JobOpportunityController.insert(job);
      if (!!uuid) jobsSavedCount++
    }

    console.log(`[${this.platform}] saved ${jobsSavedCount} jobs!`);
    return jobsSavedCount;
  }
}