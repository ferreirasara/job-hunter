import { uniqBy } from "lodash";
import fetch from "node-fetch";
import puppeteer from "puppeteer";
import JobOpportunityController from "../controllers/JobOpportunity.controller";

type GupyResponse = {
  data: GupyData[]
}
type GupyData = {
  id: number,
  companyId: number,
  name: string,
  description: string,
  careerPageId: number,
  careerPageName: string,
  careerPageLogo: string,
  type: string,
  publishedDate: string,
  applicationDeadline: any,
  isRemoteWork: boolean,
  city: string,
  state: string,
  country: string,
  jobUrl: string,
  badges: {
    friendlyBadge: boolean,
  },
  disabilities: boolean,
  careerPageUrl: string,
}

export const gupyScraper = async () => {
  const newJobs = await getNewJobs();
  const newJobsWithDescription = await getNewJobsWithDescription(newJobs);
  await saveNewJobs(newJobsWithDescription);
}

export const getNewJobs = async () => {
  try {
    const reactResponse = await fetch('https://portal.api.gupy.io/api/v1/jobs?isRemoteWork=true&jobName=react&limit=1000');
    const reactResponseJson: GupyResponse = await reactResponse?.json();
    const frontendResponse = await fetch('https://portal.api.gupy.io/api/v1/jobs?isRemoteWork=true&jobName=frontend&limit=1000');
    const frontendResponseJson: GupyResponse = await frontendResponse?.json();

    const allJobs = [...reactResponseJson?.data, ...frontendResponseJson?.data];
    const uniqJobs = uniqBy(allJobs, 'id');
    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform("GUPY");
    const existentJobIds = existentJobs?.map(cur => parseInt(cur?.idInPlatform));
    const newJobs = uniqJobs?.filter(cur => !existentJobIds?.includes(cur?.id))

    return newJobs;
  } catch (e) {
    return [];
  }
}

export const getNewJobsWithDescription = async (newJobs: GupyData[]) => {
  const jobsWithDescription: GupyData[] = [];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
      request.abort();
    } else {
      request.continue();
    }
  });

  const newJobsLength = newJobs?.length

  for (let i = 0; i < newJobsLength; i++) {
    const job = newJobs[i];
    console.log(`[Gupy] Seeking description for job ${i + 1} of ${newJobsLength}...`);
    try {
      await page.goto(job?.jobUrl);
      const description = await page?.$$eval('[data-testid="text-section"]', (el) => el?.map(cur => cur?.innerText)?.join('\n\n'));
      jobsWithDescription.push({ ...job, description });
    } catch (e) {
      console.log(`[Gupy] Error: ${JSON.stringify(e)}`);
      continue;
    }
  }

  await browser.close();
  return jobsWithDescription;
}

export const saveNewJobs = async (newJobs: GupyData[]) => {
  const newJobsLength = newJobs?.length;
  let newJobsSavedCount = 0;

  for (let i = 0; i < newJobsLength; i++) {
    const job = newJobs[i];
    console.log(`[Gupy] Saving job ${i + 1} of ${newJobsLength}...`);
    const uuid = await JobOpportunityController.insert({
      city: job.city,
      company: job.careerPageName,
      country: job.country,
      description: job.description,
      idInPlatform: job.id?.toString(),
      platform: "GUPY",
      state: job.state,
      title: job.name,
      url: job.jobUrl,
    })

    if (!!uuid) newJobsSavedCount++
  }

  console.log(`[Gupy] Saved ${newJobsSavedCount} jobs!`);
}