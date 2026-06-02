import { uniqBy } from 'lodash';
import {
  GupyData,
  GupyResponse,
  JobInput,
  JobPlatform,
  JobType,
} from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import ScraperInterface from './scraperInterface';

const platform: JobPlatform = JobPlatform.GUPY;
export default class GupyScraper extends ScraperInterface {
  constructor({
    filterExistentsJobs = true,
  }: {
    filterExistentsJobs?: boolean;
  }) {
    super({ platform, filterExistentsJobs });
  }

  public async getJobs() {
    this.logMessage('Start');
    let allJobs: GupyData[] = [];

    try {
      const response1 = await fetch(
        'https://employability-portal.gupy.io/api/v1/jobs?jobName=react&limit=100&offset=0',
      );
      const response1Json: GupyResponse = await response1?.json();

      const response2 = await fetch(
        'https://employability-portal.gupy.io/api/v1/jobs?jobName=frontend&limit=100&offset=0',
      );
      const response2Json: GupyResponse = await response2?.json();

      const response3 = await fetch(
        'https://employability-portal.gupy.io/api/v1/jobs?jobName=front%20end&limit=100&offset=0',
      );
      const response3Json: GupyResponse = await response3?.json();

      const response4 = await fetch(
        'https://employability-portal.gupy.io/api/v1/jobs?jobName=javascript&limit=100&offset=0',
      );
      const response4Json: GupyResponse = await response4?.json();

      const response5 = await fetch(
        'https://employability-portal.gupy.io/api/v1/jobs?jobName=desenvolvedora&limit=100&offset=0',
      );
      const response5Json: GupyResponse = await response5?.json();

      allJobs = [
        ...response1Json?.data,
          ...response2Json?.data,
          ...response3Json?.data,
          ...response4Json?.data,
          ...response5Json?.data,
      ];
    } catch (e) {
      this.logError(e);
    }

    const uniqJobs = uniqBy(allJobs, 'id');
    this.logMessage(`Scraped jobs: ${uniqJobs?.length}`);
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform(
      this.platform,
    );
    const existentJobIds = existentJobs?.map((cur) =>
      parseInt(cur?.idInPlatform || ''),
    );
    const filteredJobs = this.filterExistentsJobs
      ? uniqJobs?.filter((cur) => !existentJobIds?.includes(cur?.id))
      : uniqJobs;
    this.logMessage(`Filtered jobs: ${filteredJobs?.length}`);

    const jobs = await this.getNewJobsWithDescription(filteredJobs);
    this.logMessage('End');
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
          yearsOfExperience: analyzerResponse?.yearsOfExperience,
        });
      } catch (e) {
        this.logError(e);
        continue;
      }
    }

    await browser.close();
    return jobsWithDescription;
  }
}
