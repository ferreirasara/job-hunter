import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import {
  analyzeDescription,
  getProgramathorNormalizedSkill,
} from '../analyzer/analyzer';
import { PROGRAMATHOR_URLS } from '../urls/urls';
import ScraperInterface from './scraperInterface';

const platform: JobPlatform = JobPlatform.PROGRAMATHOR;
export default class ProgramathorScraper extends ScraperInterface {
  constructor({ initialUrl }: { initialUrl?: string }) {
    super({ platform, initialUrl });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({});
    this.log('Start');

    const urls = await this.getUrls(page);
    this.log(`Scraped jobs: ${urls?.length}`);
    const filteredUrls = await this.filterJobs(urls);
    this.log(`Filtered jobs: ${filteredUrls?.length}`);

    const jobs: JobInput[] = await this.getDetails(page, filteredUrls);

    await browser.close();

    this.log('End');
    return jobs;
  }

  private async getUrls(page: Page): Promise<JobInitialData[]> {
    if (!!this.initialUrl) {
      return [this.convertUrlToJobInitialData(this.initialUrl)];
    }

    const result: JobInitialData[] = [];
    for (const url of PROGRAMATHOR_URLS) {
      try {
        await page.goto(url);
        const urls: string[] = await page?.$$eval('div.cell-list > a', (el) =>
          el?.map((cur) => cur?.href),
        );
        result?.push(...urls?.map((url) => this.convertUrlToJobInitialData(url)));
      } catch (e) {
        this.log(e, { error: true });
        continue;
      }
    }
    return result;
  }

  private async getDetails(
    page: Page,
    urls: JobInitialData[],
  ): Promise<JobInput[]> {
    const urlsLength = urls?.length;
    const jobs: JobInput[] = [];
    for (let i = 0; i < urlsLength; i++) {
      try {
        const obj = urls[i];
        await page.goto(obj?.url);

        try {
          const expired = await page.$eval(
            'span.text-16.border-red.border-radius-4.padding-xs-full.color-red',
            (el) => el?.innerText,
          );
          if (!!expired) continue;
        } catch { }

        const title = await page?.$eval(
          'div.container > h1',
          (el) => el?.innerText,
        );
        const programathorSkills = await page?.$$eval(
          'div.container > a > span',
          (el) => el?.map((cur) => cur?.innerText),
        );
        const normalizedSkills = programathorSkills?.map((cur) =>
          getProgramathorNormalizedSkill(cur),
        );
        const company = await page?.$eval(
          'div.wrapper-content-job-show > h2',
          (el) => el?.innerText,
        );
        const infoArray: string[] = await page?.$$eval(
          'div.wrapper-content-job-show',
          (el) => el?.map((cur) => cur?.innerText),
        );
        const descriptionOriginal = await page?.$$eval(
          'div.line-height-2-4',
          (el) => el?.map((cur) => cur?.innerText)?.join('\n\n'),
        );
        const analyzerResponse = analyzeDescription({
          title,
          description: infoArray?.join('\n') + descriptionOriginal,
          skills: normalizedSkills,
        });

        jobs?.push({
          title,
          company,
          description: analyzerResponse?.description,
          url: obj?.url,
          idInPlatform: obj?.idInPlatform,
          type: analyzerResponse?.type,
          platform: this.platform,
          skills: analyzerResponse?.skills?.join(','),
          benefits: analyzerResponse?.benefits?.join(','),
          benefitsRating: analyzerResponse?.benefitsRating,
          skillsRating: analyzerResponse?.skillsRating,
          hiringRegime: analyzerResponse?.hiringRegime,
          seniority: analyzerResponse?.seniority,
        });
      } catch (e) {
        this.log(e, { error: true, url: urls?.[i]?.url });
        continue;
      }
    }

    return jobs;
  }

  protected convertUrlToJobInitialData(url: string): JobInitialData {
    return {
      url,
      idInPlatform: url?.split('jobs/')?.[1]?.split('-')?.[0],
    };
  }
}
