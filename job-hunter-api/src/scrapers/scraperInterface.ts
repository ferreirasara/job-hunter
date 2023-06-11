import puppeteer from "puppeteer";
import JobOpportunityController, { JobInput, JobPlatform } from "../controllers/JobOpportunity.controller";
import { interceptRequest } from "../utils/utils";

export default abstract class ScraperInterface {
  protected platform: JobPlatform

  constructor({ platform }: { platform: JobPlatform }) {
    this.platform = platform;
  }

  public abstract getJobs(filterExistentsJobs: boolean): Promise<JobInput[]>

  protected async getBrowser(dontAbortScript?: boolean) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";
    await page.setUserAgent(ua);
    await page.setRequestInterception(true);
    page.on('request', (request) => interceptRequest(request, dontAbortScript));

    return { browser, page }
  }

  protected async logError(e: any) {
    console.log(`[${this.platform}] Error: ${e}`);
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
      const response = await JobOpportunityController.insert(job);
      if (!!response?.success) jobsSavedCount++
    }

    console.log(`[${this.platform}] saved ${jobsSavedCount} jobs!`);
    return jobsSavedCount;
  }
}