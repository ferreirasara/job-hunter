import puppeteer, { Page } from "puppeteer";
import JobOpportunityController from "../controllers/JobOpportunity.controller";

type TramposJob = {
  title: string,
  company: string,
  description: string,
  url: string,
  idInPlatform: string,
  salaryRange?: string,
  country?: string
  state?: string
  city?: string
}

type TramposInitialData = { url: string, idInPlatform: string }

export const tramposScraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
      request.abort();
    } else {
      request.continue();
    }
  });

  const urls = await getUrls(page);
  const existentJobs = await JobOpportunityController.getAllJobsFromPlatform("TRAMPOS");
  const existentJobsIds = existentJobs?.map(cur => cur?.idInPlatform);
  const filteredUrls = urls?.filter(cur => !existentJobsIds?.includes(cur?.idInPlatform))

  const jobs: TramposJob[] = await getDetails(page, filteredUrls);
  await savejobs(jobs);

  await browser.close();
}

const savejobs = async (jobs: TramposJob[]) => {
  const jobsLength = jobs?.length;
  let jobsSavedCount = 0;

  for (let i = 0; i < jobsLength; i++) {
    const job = jobs[i];
    console.log(`[Trampos] Saving job ${i + 1} of ${jobsLength}...`);
    const uuid = await JobOpportunityController.insert({
      company: job.company,
      description: job.description,
      platform: "TRAMPOS",
      title: job.title,
      url: job.url,
      idInPlatform: job?.idInPlatform,
      salaryRange: job?.salaryRange,
      city: job?.city,
      state: job?.state,
    })

    if (!!uuid) jobsSavedCount++
  }

  console.log(`[Trampos] Saved ${jobsSavedCount} jobs!`);
}

const getDetails = async (page: Page, urls: TramposInitialData[]): Promise<TramposJob[]> => {
  const urlsLength = urls?.length;
  const jobs: TramposJob[] = [];
  for (let i = 0; i < urlsLength; i++) {
    console.log(`[Trampos] Seeking info for job ${i + 1} of ${urlsLength}...`);
    try {
      const obj = urls[i]
      await page.goto(obj?.url);
      const title = await page?.$eval('div.opportunity > h1.name', (el) => el?.innerText);
      const company = await page?.$eval('div.opportunity > p.address', (el) => el?.innerText?.split(' | ')?.[0]);
      const address: string = await page?.$eval('div.opportunity > p.address', (el) => el?.innerText?.split(' | ')?.[1]);
      const description = await page?.$eval('div.opportunity > div.description', (el) => el?.innerText);
      const salaryRange = await page?.$eval('div.value > span.blog-description', (el) => el?.innerText);

      jobs?.push({
        title,
        company,
        description,
        url: obj?.url,
        idInPlatform: obj?.idInPlatform,
        salaryRange,
        city: address?.split(' - ')?.[1]?.split(', ')?.[0],
        state: address?.split(' - ')?.[1]?.split(', ')?.[1],
      });
    } catch (e) {
      console.log(`[Trampos] Error: ${JSON.stringify(e)}`);
      continue;
    }
  }

  return jobs;
}

const getUrls = async (page: Page): Promise<TramposInitialData[]> => {
  await page.goto("https://trampos.co/oportunidades/?ct[]=programacao&tp[]=emprego&tp[]=freela", { waitUntil: "domcontentloaded" });

  await page.waitForSelector('p.paging');
  const totalOfPages = await page.$eval('p.paging', el => parseInt(el?.innerText?.split(' de ')?.[1]))

  for (let i = 0; i < totalOfPages - 1; i++) {
    await page.waitForSelector('a.btn.btn-lg.btn-success');
    await page.click('a.btn.btn-lg.btn-success');
  }

  const urls: string[] = await page?.$$eval('a.ember-view', (el) => el?.map(cur => cur?.href));
  const result: TramposInitialData[] = urls?.map(url => ({ url, idInPlatform: url?.split('oportunidades/')?.[1]?.split('?')?.[0] }));

  return result;
}