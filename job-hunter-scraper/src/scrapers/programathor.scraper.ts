import puppeteer, { Page } from "puppeteer";
import JobOpportunityController from "../controllers/JobOpportunity.controller";

type ProgramathorJob = {
  title: string,
  company: string,
  skills: string[],
  description: string,
  url: string,
  idInPlatform: string,
}

type ProgramathorInitialData = { url: string, idInPlatform: string }

export const programathorScraper = async () => {
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

  const urls = await getUrls(page);
  const existentJobs = await JobOpportunityController.getAllJobsFromPlatform("PROGRAMATHOR");
  const existentJobsIds = existentJobs?.map(cur => cur?.idInPlatform);
  const filteredUrls = urls?.filter(cur => !existentJobsIds?.includes(cur?.idInPlatform))

  const jobs: ProgramathorJob[] = await getDetails(page, filteredUrls);
  await savejobs(jobs);

  await browser.close();
}

export const savejobs = async (jobs: ProgramathorJob[]) => {
  const jobsLength = jobs?.length;
  let jobsSavedCount = 0;

  for (let i = 0; i < jobsLength; i++) {
    const job = jobs[i];
    console.log(`[Programathor] Saving job ${i + 1} of ${jobsLength}...`);
    const uuid = await JobOpportunityController.insert({
      company: job.company,
      description: job.description,
      platform: "PROGRAMATHOR",
      title: job.title,
      url: job.url,
      skills: job?.skills?.join(', '),
      idInPlatform: job?.idInPlatform,
    })

    if (!!uuid) jobsSavedCount++
  }

  console.log(`[Programathor] Saved ${jobsSavedCount} jobs!`);
}

const getDetails = async (page: Page, urls: ProgramathorInitialData[]): Promise<ProgramathorJob[]> => {
  const urlsLength = urls?.length;
  const jobs: ProgramathorJob[] = [];
  for (let i = 0; i < urlsLength; i++) {
    console.log(`[Programathor] Seeking info for job ${i + 1} of ${urlsLength}...`);
    try {
      const obj = urls[i]
      await page.goto(obj?.url);
      const title = await page?.$eval('div.container > h1', (el) => el?.innerText);
      const skills = await page?.$$eval('div.container > a > span', (el) => el?.map(cur => cur?.innerText));
      const company = await page?.$eval('div.wrapper-content-job-show > h2', (el) => el?.innerText);
      const description = await page?.$$eval('div.line-height-2-4', (el) => el?.map(cur => cur?.innerText)?.join('\n\n'));

      jobs?.push({ title, skills, company, description, url: obj?.url, idInPlatform: obj?.idInPlatform });
    } catch (e) {
      console.log(`[Programathor] Error: ${JSON.stringify(e)}`);
      continue;
    }
  }

  return jobs;
}

const getUrls = async (page: Page): Promise<ProgramathorInitialData[]> => {
  await page.goto("https://programathor.com.br/jobs-front-end");
  const urls: string[] = await page?.$$eval('div.cell-list > a', (el) => el?.map(cur => cur?.href));
  const result: ProgramathorInitialData[] = urls?.map(url => ({ url, idInPlatform: url?.split('jobs/')?.[1]?.split('-')?.[0] }))
  return result;
}