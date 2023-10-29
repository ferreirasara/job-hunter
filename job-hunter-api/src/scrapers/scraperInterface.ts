import puppeteer from "puppeteer";
import JobOpportunityController from "../controllers/JobOpportunity.controller";
import { interceptRequest, removeAccent } from "../utils/utils";
import { JobInput, JobPlatform } from "../@types/types";

export default abstract class ScraperInterface {
  protected platform: JobPlatform
  protected filterExistentsJobs: boolean

  constructor({ platform, filterExistentsJobs }: { platform: JobPlatform, filterExistentsJobs?: boolean }) {
    this.platform = platform;
    this.filterExistentsJobs = filterExistentsJobs;
  }

  public abstract getJobs(): Promise<JobInput[]>

  protected async getBrowser({ abortScript, abortStyle }: { abortScript?: boolean, abortStyle?: boolean }) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";
    await page.setUserAgent(ua);
    await page.setRequestInterception(true);
    page.on('request', (request) => interceptRequest({ request, abortScript, abortStyle }));

    return { browser, page }
  }

  protected async logError(e: any) {
    console.log(`[${this.platform}] Error: ${e}`);
  }

  protected async logMessage(message: string) {
    console.log(`[${this.platform}] ${message}`);
  }

  public async saveJobs(): Promise<number> {
    const jobs = await this.getJobs();
    const jobsLength = jobs?.length;
    console.log(`[${this.platform}] there are ${jobsLength} new jobs to save!`);
    let jobsSavedCount = 0;

    for (let i = 0; i < jobsLength; i++) {
      const job = jobs?.[i];
      const title = removeAccent(job?.title?.toLowerCase())
      const company = removeAccent(job?.company?.toLowerCase())
      const description = removeAccent(job?.description?.toLowerCase())

      const unwantedJob = title?.includes('banco de talentos') ||
        title?.includes('talent pool') ||
        company?.includes('boticário') ||
        company?.includes('stefanini') ||
        title?.includes('design') ||
        title?.includes('marketing') ||
        title?.includes('professor') ||
        title?.includes('caixa') ||
        title?.includes('telemarketing') ||
        description?.includes('telemarketing') ||
        title?.includes('logistica') ||
        title?.includes('vendedor') ||
        title?.includes('estoquista') ||
        title?.includes('estocagem')

      if (!unwantedJob) {
        const response = await JobOpportunityController.insert(job);
        if (!!response?.success) jobsSavedCount++
      } else {
        console.log(`[${this.platform}] unwanted job: ${job.title} (${job.company})`)
      }
    }

    console.log(`[${this.platform}] saved ${jobsSavedCount} jobs!`);
    return jobsSavedCount;
  }
}