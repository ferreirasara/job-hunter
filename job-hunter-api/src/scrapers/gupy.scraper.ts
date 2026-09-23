import { uniqBy } from 'lodash';
import {
  GupyData,
  GupyResponse,
  JobInitialData,
  JobInput,
  JobPlatform,
  JobType,
} from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './scraperInterface';
import { GUPY_URLS } from '../urls/urls';

const platform: JobPlatform = JobPlatform.GUPY;
export default class GupyScraper extends ScraperInterface {
  constructor({ initialUrl }: { initialUrl?: string }) {
    super({ platform, initialUrl });
  }

  public async getJobs() {
    this.log('Start');

    const allJobs: GupyData[] = [];

    for (const url of GUPY_URLS) {
      try {
        const response = await fetch(url);
        const responseJson: GupyResponse = await response?.json() as GupyResponse;
        allJobs.push(...responseJson?.data);
      } catch (e) {
        this.log(e, { error: true, url });
      }
    }

    const uniqJobs = uniqBy(allJobs, 'id');
    this.log(`Scraped jobs: ${uniqJobs?.length}`);
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform(
      this.platform,
    );
    const existentJobIds = existentJobs?.map((cur) =>
      parseInt(cur?.idInPlatform || ''),
    );
    const filteredJobs = uniqJobs?.filter((cur) => !existentJobIds?.includes(cur?.id));
    this.log(`Filtered jobs: ${filteredJobs?.length}`);

    const jobs = await this.getNewJobsWithDescription(filteredJobs);
    this.log('End');
    return jobs;
  }

  private async getNewJobsWithDescription(jobs: GupyData[]) {
    const jobsWithDescription: JobInput[] = [];
    const { browser, page } = await this.getBrowser({});

    const jobsLength = jobs?.length;

    for (let i = 0; i < jobsLength; i++) {
      const job = jobs[i];
      try {
        await page.goto(job?.jobUrl);
        const descriptionOriginal = (
          await page?.$$eval('section > div', (el) =>
            el?.map((cur) => cur?.textContent),
          )
        ).join('\n');
        const analyzerResponse = analyzeDescription({
          title: job.name,
          description: descriptionOriginal,
        });

        jobsWithDescription.push({
          company: job.careerPageName,
          platform: this.platform,
          title: job.name,
          url: job.jobUrl,
          city: job.city,
          country: job.country,
          idInPlatform: job.id.toString(),
          state: job.state,
          type: job.isRemoteWork ? JobType.REMOTE : analyzerResponse?.type,
          description: analyzerResponse?.description,
          skills: analyzerResponse?.skills?.join(','),
          benefits: analyzerResponse?.benefits?.join(','),
          benefitsRating: analyzerResponse?.benefitsRating,
          skillsRating: analyzerResponse?.skillsRating,
          hiringRegime: analyzerResponse?.hiringRegime,
          seniority: analyzerResponse?.seniority,
        });
      } catch (e) {
        this.log(e, { error: true, url: jobs?.[i]?.jobUrl });
        continue;
      }
    }

    await browser.close();
    return jobsWithDescription;
  }

  protected convertUrlToJobInitialData(url: string): JobInitialData {
    return {
      url,
      idInPlatform: url,
    };
  }
}
