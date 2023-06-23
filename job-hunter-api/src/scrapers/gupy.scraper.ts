import { uniqBy } from "lodash";
import fetch from "node-fetch";
import JobOpportunityController from "../controllers/JobOpportunity.controller";
import ScraperInterface from "./ScraperInterface";
import { analyzeDescription } from "../analyzer/analyzer";
import { GupyData, GupyResponse, JobInput, JobPlatform, JobType } from "../@types/types";

const platform: JobPlatform = JobPlatform.GUPY
export default class GupyScraper extends ScraperInterface {
  constructor({ filterExistentsJobs }: { filterExistentsJobs?: boolean }) {
    super({ platform, filterExistentsJobs })
  }

  public async getJobs() {
    this.logMessage("Start");
    let allJobs = [];

    try {
      const response1 = await fetch('https://portal.api.gupy.io/api/v1/jobs?isRemoteWork=true&jobName=react&limit=1000');
      const response1Json: GupyResponse = await response1?.json();
      const response2 = await fetch('https://portal.api.gupy.io/api/v1/jobs?isRemoteWork=true&jobName=frontend&limit=1000');
      const response2Json: GupyResponse = await response2?.json();
      const response3 = await fetch('https://portal.api.gupy.io/api/v1/jobs?isRemoteWork=true&jobName=front%20end&limit=1000');
      const response3Json: GupyResponse = await response3?.json();
      const response4 = await fetch('https://portal.api.gupy.io/api/v1/jobs?isRemoteWork=true&jobName=javascript&limit=1000');
      const response4Json: GupyResponse = await response4?.json();
      allJobs = [...response1Json?.data, ...response2Json?.data, ...response3Json?.data, ...response4Json?.data];
    } catch (e) {
      this.logError(e);
    }

    const uniqJobs = uniqBy(allJobs, 'id');
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform(this.platform);
    const existentJobIds = existentJobs?.map(cur => parseInt(cur?.idInPlatform));
    const filteredJobs = this.filterExistentsJobs ? uniqJobs?.filter(cur => !existentJobIds?.includes(cur?.id)) : uniqJobs;

    const jobs = await this.getNewJobsWithDescription(filteredJobs);
    this.logMessage("End");
    return jobs;
  }

  private async getNewJobsWithDescription(jobs: GupyData[]) {
    const jobsWithDescription: JobInput[] = [];
    const { browser, page } = await this.getBrowser({});

    const jobsLength = jobs?.length

    for (let i = 0; i < jobsLength; i++) {
      const job = jobs[i];
      try {
        await page.goto(job?.jobUrl);
        const descriptionOriginal = await page?.$$eval('[data-testid="text-section"]', (el) => el?.map(cur => cur?.innerText)?.join('\n\n'));
        const analyzerResponse = analyzeDescription({ description: descriptionOriginal });

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
          skills: analyzerResponse?.skills?.join(', '),
          benefits: analyzerResponse?.benefits?.join(', '),
          benefitsRating: analyzerResponse?.benefitsRating,
          skillsRating: analyzerResponse?.skillsRating,
          hiringRegime: analyzerResponse?.hiringRegime,
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