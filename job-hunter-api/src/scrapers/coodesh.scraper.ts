import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import ScraperInterface from './scraperInterface';
import { COODESH_URLS } from '../urls/urls';

const platform: JobPlatform = JobPlatform.COODESH;

export default class CoodeshScraper extends ScraperInterface {
  constructor({ initialUrl }: { initialUrl?: string }) {
    super({ platform, initialUrl });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({
      abortScript: false,
      abortStyle: true,
      headless: true,
    });
    this.log('Start');

    const urls = await this.getUrls(page);
    this.log(`Scraped jobs: ${urls?.length}`);
    const filteredUrls = await this.filterJobs(urls);
    this.log(`Filtered jobs: ${filteredUrls?.length}`);

    const jobs = await this.getDetails(page, filteredUrls);
    await browser.close();

    this.log('End');
    return jobs;
  }

  private async getUrls(page: Page) {
    if (!!this.initialUrl) {
      return [this.convertUrlToJobInitialData(this.initialUrl)];
    }

    const allUrls: string[] = [];
    for (const url of COODESH_URLS) {
      try {
        await page.goto(url);
        await page.waitForSelector('div.chakra-stack > a.chakra-link');
        const localUrls: string[] = await page?.$$eval('div.chakra-stack > a.chakra-link', (el) =>
          el?.map((cur) => cur?.href),
        );
        allUrls.push(...localUrls);
      } catch (e) {
        this.log(e, { error: true, url });
      }
    }

    const urls = allUrls;
    const result: JobInitialData[] = urls?.map((url) => this.convertUrlToJobInitialData(url));

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
        await page.goto(obj?.url, { waitUntil: 'networkidle0' });
        const title = await page?.$eval('h1', (el) => el?.innerText);
        const company = await page?.$eval('div.chakra-stack > div.chakra-stack > p.chakra-text', (el) => el?.innerText);
        const info: string[] = await page?.$$eval(
          'div.chakra-stack > p.chakra-text',
          (el) => el?.map((cur) => cur?.innerText),
        );
        const descriptionOriginal = await page?.$$eval(
          'div > div > div > p.chakra-text',
          (el) => el?.map((cur) => cur?.innerText)?.join('\n\n'),
        );
        const analyzerResponse = analyzeDescription({
          title,
          description: info?.join(', ') + descriptionOriginal,
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
    const url1 = url?.split('?')?.[0];
    return {
      url,
      idInPlatform: url1?.split('-')?.[url1?.split('-')?.length - 1],
    };
  }
}
