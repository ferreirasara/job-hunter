import puppeteer from 'puppeteer-extra';
import { JobInput, JobPlatform, SaveJobsResponse } from '../@types/types';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import {
  formatDateHour,
  interceptRequest,
  isDiscardedJob,
  isUnwantedJob,
  removeAccent,
} from '../utils/utils';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

type LogOptions = {
  color?: string;
  error?: boolean;
  url?: string;
};

export default abstract class ScraperInterface {
  protected platform: JobPlatform;
  protected filterExistentsJobs: boolean;

  constructor({
    platform,
    filterExistentsJobs,
  }: {
    platform: JobPlatform;
    filterExistentsJobs: boolean;
  }) {
    this.platform = platform;
    this.filterExistentsJobs = filterExistentsJobs;
  }

  public abstract getJobs(): Promise<JobInput[]>;

  protected async getBrowser({
    abortScript,
    abortStyle,
    headless = true,
  }: {
    abortScript?: boolean;
    abortStyle?: boolean;
    headless?: boolean;
  }) {
    const browser = await puppeteer.launch({ headless, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    await page.setUserAgent(ua);
    await page.setRequestInterception(true);
    page.on('request', (request) =>
      interceptRequest({ request, abortScript, abortStyle }),
    );

    return { browser, page };
  }

  protected log(message: unknown, options: LogOptions = {}) {
    const timestamp = formatDateHour(new Date().toISOString());
    const logMessage = options.error
      ? `Error: ${String(message)}. ${options.url || ''}`
      : String(message);
    const plainLog = `[${this.platform}] [${timestamp}] ${logMessage}`;
    const consoleLog = options.color
      ? `${options.color}${plainLog}\x1b[0m`
      : plainLog;

    console.log(consoleLog);
  }

  public async saveJobs(): Promise<SaveJobsResponse> {
    const jobs = await this.getJobs();
    const jobsLength = jobs?.length;
    let jobsSavedCount = 0;
    let jobsUnsavedCount = 0;
    let jobsDiscardedCount = 0;
    let duplicatedJobsCount = 0;

    for (let i = 0; i < jobsLength; i++) {
      const job = jobs?.[i];
      const title = removeAccent(job?.title?.toLowerCase());
      const company = removeAccent(job?.company?.toLowerCase());
      const description = removeAccent(job?.description?.toLowerCase());

      const unwantedJob = isUnwantedJob({ title, company, description, skillsRating: job.skillsRating || 0 });

      if (!unwantedJob) {
        const discarded = isDiscardedJob({ title, skills: job.skills || '' });
        if (discarded) {
          jobsDiscardedCount++;
          this.log(`auto discarded job: ${job.title} (${job.company})`, {
            color: '\x1b[33m',
          });
        }

        const response = await JobOpportunityController.insert({
          ...job,
          discarded,
        });
        if (response?.success && !discarded) {
          jobsSavedCount++;
        } else if (response?.message === 'Duplicated') {
          duplicatedJobsCount++;
          this.log(`duplicated job: ${job.title} (${job.company})`, {
            color: '\x1b[34m',
          });
        }
      } else {
        jobsUnsavedCount++;
        this.log(`unwanted job: ${job.title} (${job.company})`, {
          color: '\x1b[34m',
        });
      }
    }

    this.log(`saved ${jobsSavedCount} jobs!`);

    return {
      jobsSavedCount,
      jobsDiscardedCount,
      jobsUnsavedCount,
      duplicatedJobsCount,
      totalJobs: jobs?.length,
    };
  }
}
