import { SaveJobsResponse, ScrapersToRun } from '../@types/types';
import { sendMessageToTelegram } from '../utils/utils';
import CoodeshScraper from './coodesh.scraper';
import DivulgaVagasScraper from './divulgaVagas.scraper';
import GupyScraper from './gupy.scraper';
import ProgramathorScraper from './programathor.scraper';
import RemotarScraper from './remotar.scraper';
import SolidesScraper from './solides.scraper';
import StartupScraper from './startup.scraper';

export const runScrapers = async (scrapersToRun: ScrapersToRun[]) => {
  let result: SaveJobsResponse | null = null;
  let jobsSavedCount = 0;
  let jobsUnsavedCount = 0;
  let jobsDiscardedCount = 0;
  let duplicatedJobsCount = 0;

  const updateCounts = (result: SaveJobsResponse) => {
    jobsSavedCount += result.jobsSavedCount;
    jobsUnsavedCount += result.jobsUnsavedCount;
    jobsDiscardedCount += result.jobsDiscardedCount;
    duplicatedJobsCount += result.duplicatedJobsCount;
  };

  if (scrapersToRun.includes('startup') || scrapersToRun.includes('all')) {
    const startupScraper = new StartupScraper({});
    result = await startupScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun.includes('gupy') || scrapersToRun.includes('all')) {
    const gupyScraper = new GupyScraper({});
    result = await gupyScraper.saveJobs();
    updateCounts(result);
  }

  // const linkedinScraper = new LinkedinScraper({});
  // result = await linkedinScraper.saveJobs();
  // updateCounts(result);

  if (scrapersToRun.includes('programathor') || scrapersToRun.includes('all')) {
    const programathorScraper = new ProgramathorScraper({});
    result = await programathorScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun.includes('remotar') || scrapersToRun.includes('all')) {
    const remotarScraper = new RemotarScraper({});
    result = await remotarScraper.saveJobs();
    updateCounts(result);
  }

  // if (scrapersToRun.includes('trampos') || scrapersToRun.includes('all')) {
  //   const tramposScraper = new TramposScraper({});
  //   result = await tramposScraper.saveJobs();
  //   updateCounts(result);
  // }

  // if (scrapersToRun.includes('vagas') || scrapersToRun.includes('all')) {
  //   const vagasScraper = new VagasScraper({});
  //   result = await vagasScraper.saveJobs();
  //   updateCounts(result);
  // }

  // const jobatusScraper = new JobatusScraper({});
  // result = await jobatusScraper.saveJobs();
  // updateCounts(result);

  if (scrapersToRun.includes('divulgaVagas') || scrapersToRun.includes('all')) {
    const divulgaVagasScraper = new DivulgaVagasScraper({});
    result = await divulgaVagasScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun.includes('coodesh') || scrapersToRun.includes('all')) {
    const coodeshScraper = new CoodeshScraper({});
    result = await coodeshScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun.includes('solides') || scrapersToRun.includes('all')) {
    const solidesScraper = new SolidesScraper({});
    result = await solidesScraper.saveJobs();
    updateCounts(result);
  }

  console.log(`\n\n\x1b[43m Number of saved jobs: ${jobsSavedCount} \x1b[0m`);
  console.log(`\x1b[43m Number of unsaved jobs: ${jobsUnsavedCount} \x1b[0m`);
  console.log(`\x1b[43m Number of discarded jobs: ${jobsDiscardedCount} \x1b[0m`);
  console.log(`\x1b[43m Number of duplicated jobs: ${duplicatedJobsCount} \x1b[0m`);

  const hasSomeNonZeroCount = [jobsSavedCount, jobsUnsavedCount, jobsDiscardedCount, duplicatedJobsCount].some((cur) => cur > 0);
  if (hasSomeNonZeroCount) {
    await sendMessageToTelegram(`Scrapers executed!\n\nNumber of saved jobs: ${jobsSavedCount}\nNumber of unsaved jobs: ${jobsUnsavedCount}\nNumber of discarded jobs: ${jobsDiscardedCount}\nNumber of duplicated jobs: ${duplicatedJobsCount}`);
  }
}
