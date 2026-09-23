import { uniq } from 'lodash';
import { Page } from 'puppeteer';
import { JobInitialData, JobInput, JobPlatform } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import ScraperInterface from './scraperInterface';
import { DIVULGA_VAGAS_URLS } from '../urls/urls';

const platform: JobPlatform = JobPlatform.DIVULGA_VAGAS;
export default class DivulgaVagasScraper extends ScraperInterface {
  constructor({ initialUrl }: { initialUrl?: string }) {
    super({ platform, initialUrl });
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({
      abortScript: true,
      abortStyle: true,
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
    for (const url of DIVULGA_VAGAS_URLS) {
      try {
        await page.goto(url);
        await page.waitForSelector('div.vaga-titulo-text > a');
        const localUrls: string[] = await page?.$$eval('div.vaga-titulo-text > a', (el) =>
          el?.map((cur) => cur?.href),
        );
        allUrls.push(...localUrls);
      } catch (e) {
        this.log(e, { error: true, url });
      }
    }

    const urls = uniq(allUrls);
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
        await page.goto(obj?.url, { waitUntil: 'domcontentloaded' });
        const title = await page?.$eval('h1', (el) => el?.innerText);
        const location: string = await page?.$eval(
          'div.job-company-section > div.job-info-grid > div.job-info-item',
          (el) => el?.innerText,
        );
        const company = (
          await page?.$eval('div.job-company-name', (el) => el?.innerText)
        )?.trim();
        const descriptionOriginal = (
          await page?.$$eval('section.job-card', (el) =>
            el?.map((cur) => cur?.innerText),
          )
        )?.join('\n\n');
        const analyzerResponse = analyzeDescription({
          title,
          description: descriptionOriginal,
        });

        jobs?.push({
          title,
          company,
          city: location?.split('-')?.[0]?.trim(),
          state: location?.split('-')?.[1]?.trim(),
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
      idInPlatform: url?.split('-')?.[url?.split('-')?.length - 1],
    };
  }
}
