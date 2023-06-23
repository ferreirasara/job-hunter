import { Page } from "puppeteer";
import JobOpportunityController, { JobInitialData, JobInput, JobPlatform, JobType } from "../controllers/JobOpportunity.controller";
import ScraperInterface from "./ScraperInterface";
import { getBenefitsBasedOnDescription, getHiringRegimeBasedOnDescription, getRatingsBasedOnSkillsAndBenefits, getSkillsBasedOnDescription, getTypeBasedOnDescription } from "../analyzer/analyzer";
import { uniq } from "lodash";

const platform: JobPlatform = "VAGAS"

export default class VagasScraper extends ScraperInterface {
  constructor({ filterExistentsJobs }: { filterExistentsJobs?: boolean }) {
    super({ platform, filterExistentsJobs })
  }

  public async getJobs(): Promise<JobInput[]> {
    const { browser, page } = await this.getBrowser({});
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
    try {
      await page.goto("https://www.vagas.com.br/vagas-de-frontend?m%5B%5D=100%25+Home+Office");
      const frontendUrls: string[] = await page?.$$eval('a.link-detalhes-vaga', (el) => el?.map(cur => cur?.href));

      await page.goto("https://www.vagas.com.br/vagas-de-front%20end?m%5B%5D=100%25+Home+Office");
      const frontend2Urls: string[] = await page?.$$eval('a.link-detalhes-vaga', (el) => el?.map(cur => cur?.href));

      await page.goto("https://www.vagas.com.br/vagas-de-react?m%5B%5D=100%25+Home+Office");
      const reactUrls: string[] = await page?.$$eval('a.link-detalhes-vaga', (el) => el?.map(cur => cur?.href));

      const allUrls = [...frontendUrls, ...frontend2Urls, ...reactUrls];
      const urls = uniq(allUrls);

      const result: JobInitialData[] = urls?.map(url => ({ url, idInPlatform: url?.split('vagas/')?.[1]?.split('/')?.[0] }));

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
        await page.goto(obj?.url, { waitUntil: "domcontentloaded" });
        const title = await page?.$eval('h1.job-shortdescription__title', (el) => el?.innerText);
        const company = await page?.$eval('h2.job-shortdescription__company', (el) => el?.innerText);
        const descriptionOriginal = await page?.$eval('article.vaga.job-group', (el) => el?.innerText);
        let description = descriptionOriginal;

        const skillsResponse = getSkillsBasedOnDescription({ description });
        description = skillsResponse?.description;

        const benefitsResponse = getBenefitsBasedOnDescription({ description });
        description = benefitsResponse?.description;

        const { benefitsRating, skillsRating } = getRatingsBasedOnSkillsAndBenefits({ skills: skillsResponse?.skills, benefits: benefitsResponse?.benefits });
        const hiringRegime = getHiringRegimeBasedOnDescription({ description });
        const type: JobType = getTypeBasedOnDescription({ description });

        jobs?.push({
          title,
          company,
          description: description.replace(/\n+/g, '\n'),
          url: obj?.url,
          idInPlatform: obj?.idInPlatform,
          type,
          platform: this.platform,
          skills: skillsResponse?.skills?.join(', '),
          benefits: benefitsResponse?.benefits?.join(', '),
          benefitsRating,
          skillsRating,
          hiringRegime,
        });
      } catch (e) {
        this.logError(e);
        continue;
      }
    }

    return jobs;
  }
}