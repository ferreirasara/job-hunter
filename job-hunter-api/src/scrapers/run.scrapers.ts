import { SaveJobsResponse, ScrapersToRun } from '../@types/types';
import { sendMessageToTelegram, uploadErrorList } from '../utils/utils';
import CoodeshScraper from './coodesh.scraper';
import DivulgaVagasScraper from './divulgaVagas.scraper';
import FrontendBrScraper from './frontendbr.scraper';
import GupyScraper from './gupy.scraper';
import InhireScraper from './inhire.scraper';
import LinkedinScraper from './linkedin.scraper';
import ProgramathorScraper from './programathor.scraper';
import QuickinScraper from './quickin.scraper';
import RemotarScraper from './remotar.scraper';
import RemoteOkScraper from './remoteok.scraper';
import RemoteRocketshipScraper from './remoterocketship.scraper';
import RemotifyEuropeScraper from './remotifyeurope.scraper';
import SolidesScraper from './solides.scraper';
import StartupScraper from './startup.scraper';
import WeWorkRemotelyScraper from './weworkremotely.scraper';

export const runScrapers = async (scrapersToRun: ScrapersToRun[]) => {
  let result: SaveJobsResponse | null = null;
  let totalJobs = 0;
  let jobsSavedCount = 0;
  let unwantedJobsCount = 0;
  let duplicatedJobsCount = 0;

  const errorsList: string[] = [];

  const updateCounts = (result: SaveJobsResponse) => {
    totalJobs += result.totalJobs;
    jobsSavedCount += result.jobsSavedCount;
    unwantedJobsCount += result.unwantedJobsCount;
    duplicatedJobsCount += result.duplicatedJobsCount;
    errorsList.push(...(result.errorsList || []));
  };

  const start = new Date();

  if (scrapersToRun.includes('startup') || scrapersToRun.includes('all')) {
    const startupScraper = new StartupScraper({});
    result = await startupScraper.saveJobs();
    startupScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('gupy') || scrapersToRun.includes('all')) {
    const gupyScraper = new GupyScraper({});
    result = await gupyScraper.saveJobs();
    gupyScraper.clearErrorsList();
    updateCounts(result);
  }


  if (scrapersToRun.includes('linkedin') || scrapersToRun.includes('all')) {
    const linkedinScraper = new LinkedinScraper({});
    result = await linkedinScraper.saveJobs();
    linkedinScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('programathor') || scrapersToRun.includes('all')) {
    const programathorScraper = new ProgramathorScraper({});
    result = await programathorScraper.saveJobs();
    programathorScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('remotar') || scrapersToRun.includes('all')) {
    const remotarScraper = new RemotarScraper({});
    result = await remotarScraper.saveJobs();
    remotarScraper.clearErrorsList();
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
    divulgaVagasScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('coodesh') || scrapersToRun.includes('all')) {
    const coodeshScraper = new CoodeshScraper({});
    result = await coodeshScraper.saveJobs();
    coodeshScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('solides') || scrapersToRun.includes('all')) {
    const solidesScraper = new SolidesScraper({});
    result = await solidesScraper.saveJobs();
    solidesScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('weworkremotely') || scrapersToRun.includes('all')) {
    const weWorkRemotelyScraper = new WeWorkRemotelyScraper({});
    result = await weWorkRemotelyScraper.saveJobs();
    weWorkRemotelyScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('remoteok') || scrapersToRun.includes('all')) {
    const remoteOkScraper = new RemoteOkScraper({});
    result = await remoteOkScraper.saveJobs();
    remoteOkScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('remotifyeurope') || scrapersToRun.includes('all')) {
    const remotifyEuropeScraper = new RemotifyEuropeScraper({});
    result = await remotifyEuropeScraper.saveJobs();
    remotifyEuropeScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('inhire') || scrapersToRun.includes('all')) {
    const inhireScraper = new InhireScraper({});
    result = await inhireScraper.saveJobs();
    inhireScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('frontendbr') || scrapersToRun.includes('all')) {
    const frontendBrScraper = new FrontendBrScraper({});
    result = await frontendBrScraper.saveJobs();
    frontendBrScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('remoterocketship') || scrapersToRun.includes('all')) {
    const remoteRocketshipScraper = new RemoteRocketshipScraper({});
    result = await remoteRocketshipScraper.saveJobs();
    remoteRocketshipScraper.clearErrorsList();
    updateCounts(result);
  }

  if (scrapersToRun.includes('quickin') || scrapersToRun.includes('all')) {
    const quickinScraper = new QuickinScraper({});
    result = await quickinScraper.saveJobs();
    quickinScraper.clearErrorsList();
    updateCounts(result);
  }

  const end = new Date();
  const durationInMinutes = ((end.getTime() - start.getTime()) / 60000).toFixed(2);

  
  console.log(`\n\n\x1b[43m Number of total jobs: ${totalJobs} \x1b[0m`);
  console.log(`\n\x1b[43m Number of saved jobs: ${jobsSavedCount} \x1b[0m`);
  console.log(`\x1b[43m Number of unwanted jobs: ${unwantedJobsCount} \x1b[0m`);
  console.log(`\x1b[43m Number of duplicated jobs: ${duplicatedJobsCount} \x1b[0m`);
  console.log(`\x1b[43m Scraping duration: ${durationInMinutes} min \x1b[0m`);

  if (jobsSavedCount > 0) {
    await sendMessageToTelegram(`Scrapers executed!\n\nNumber of total jobs: ${totalJobs}\nNumber of saved jobs: ${jobsSavedCount}\nNumber of unwanted jobs: ${unwantedJobsCount}\nNumber of duplicated jobs: ${duplicatedJobsCount}\n\nScraping duration: ${durationInMinutes} min`);
  }

  await uploadErrorList(errorsList);
}
