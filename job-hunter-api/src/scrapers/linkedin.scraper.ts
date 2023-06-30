import { Page } from "puppeteer";
import JobOpportunityController from "../controllers/JobOpportunity.controller";
import ScraperInterface from "./ScraperInterface";
import { analyzeDescription } from "../analyzer/analyzer";
import { sleep } from "../utils/utils";
import { LINKEDIN_URLS } from "../urls/linkedinUrls";
import { JobInitialData, JobInput, JobPlatform } from "../@types/types";

const platform: JobPlatform = JobPlatform.LINKEDIN;
export default class LinkedinScraper extends ScraperInterface {
  constructor({ filterExistentsJobs }: { filterExistentsJobs?: boolean }) {
    super({ platform, filterExistentsJobs })
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({ abortScript: false, abortStyle: false });
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
    const result: JobInitialData[] = []
    for (const url of LINKEDIN_URLS) {
      try {
        await page.goto("https://www.linkedin.com/jobs/search/?keywords=Frontend%20Pleno&location=Brasil&locationId=&geoId=106057199&f_TPR=r604800&f_WT=2&position=1&pageNum=0");
        const totalOfJobs = await page?.$eval('span.results-context-header__job-count', (el) => parseInt(el?.innerText));

        for (let i = 0; i < (totalOfJobs / 25); i++) {
          await sleep(500);
          for (let keyPressed = 0; keyPressed <= 10; keyPressed++) {
            await page?.keyboard?.press('PageDown');
          }
          await page?.waitForNetworkIdle();
        }

        const urls: string[] = await page?.$$eval('a.base-card__full-link', (el) => el?.map(cur => cur?.href));
        result?.push(...urls?.map(url => {
          const urlSplit = url?.split('?')?.[0]?.split('-');
          return ({ url, idInPlatform: urlSplit?.[urlSplit?.length - 1] })
        }));
      } catch (e) {
        this.logError(e);
        continue;
      }
    }
    return result;
  }

  private async getDetails(page: Page, urls: JobInitialData[]): Promise<JobInput[]> {
    const urlsLength = urls?.length;
    const jobs: JobInput[] = [];
    for (let i = 0; i < urlsLength; i++) {
      try {
        const obj = urls[i];
        await sleep(500);
        await page.goto(obj?.url, { waitUntil: "networkidle0" });
        const title: string = await page?.$eval('h1.top-card-layout__title', (el) => el?.innerText);
        const company: string = await page?.$eval('span.topcard__flavor', (el) => el?.innerText);
        if (company?.toLowerCase() === 'programathor' || company?.toLowerCase() === 'geekuunter') continue;
        const descriptionOriginal: string = await page?.$$eval('div.description__text', (el) => el?.map(cur => cur?.innerText)?.join('\n\n'));
        const analyzerResponse = analyzeDescription({ description: descriptionOriginal });

        jobs?.push({
          title,
          company: company?.trim(),
          description: analyzerResponse?.description,
          url: obj?.url,
          idInPlatform: obj?.idInPlatform,
          type: analyzerResponse?.type,
          platform: this.platform,
          skills: analyzerResponse?.skills?.join(', '),
          benefits: analyzerResponse?.benefits?.join(', '),
          benefitsRating: analyzerResponse?.benefitsRating,
          skillsRating: analyzerResponse?.skillsRating,
          hiringRegime: analyzerResponse?.hiringRegime,
        });
      } catch (e) {
        if (!String(e)?.includes('failed to find element')) this.logError(e);
        continue;
      }
    }

    return jobs;
  }
}