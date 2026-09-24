import puppeteer from 'puppeteer-extra';
import { JobInitialData, JobInput, JobPlatform, SaveJobsResponse } from '../@types/types';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import { formatDateHour, interceptRequest, isUnwantedJob, removeAccent } from '../utils/utils';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { uniqBy } from 'lodash';

puppeteer.use(StealthPlugin());

type LogOptions = {
  color?: string;
  error?: boolean;
  url?: string;
};

export default abstract class ScraperInterface {
  protected platform: JobPlatform;
  protected initialUrl?: string;

  constructor({
    platform,
    initialUrl,
  }: {
    platform: JobPlatform;
    initialUrl?: string;
  }) {
    this.platform = platform;
    this.initialUrl = initialUrl;
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
      ? `${String(message)}. ${options.url || ''}`
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
    let unwantedJobsCount = 0;

    for (let i = 0; i < jobsLength; i++) {
      const job = jobs?.[i];
      const title = removeAccent(job?.title?.toLowerCase());
      const company = removeAccent(job?.company?.toLowerCase());
      const description = removeAccent(job?.description?.toLowerCase());

      const unwanted = !this.initialUrl || isUnwantedJob({
        title,
        company,
        description,
        skillsRating: job.skillsRating || 0,
        skills: job.skills || '',
      });

      const response = await JobOpportunityController.insert({ ...job, unwanted });
      if (response?.success) {
        if (!unwanted) jobsSavedCount++;
      } else {
        this.log(`Error while saving job: ${job.title} (${job.company}). ${response?.message || ''}`, { error: true });
      }

      if (unwanted) {
        unwantedJobsCount++;
        this.log(`Unwanted job: ${job.title} (${job.company})`, {
          color: '\x1b[34m',
        });
      }
    }

    this.log(`saved ${jobsSavedCount} jobs!`);

    return {
      jobsSavedCount,
      unwantedJobsCount,
      totalJobs: jobs?.length,
    };
  }

  protected abstract convertUrlToJobInitialData(url: string): JobInitialData;

  protected async filterJobs(jobs: JobInitialData[]): Promise<JobInitialData[]> {
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform(
      this.platform,
    );
    const existentJobsIds = existentJobs?.map((cur) => cur?.idInPlatform);

    return uniqBy(jobs, 'idInPlatform')?.filter((cur) => !existentJobsIds?.includes(cur?.idInPlatform));
  }
}
