import { JobPlatform, SaveJobsResponse } from '../@types/types';
import { sendMessageToTelegram } from '../utils/utils';
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
import TramposScraper from './trampos.scraper';
import VagasScraper from './vagas.scraper';
import WeWorkRemotelyScraper from './weworkremotely.scraper';

export const runScrapers = async (scrapersToRun: JobPlatform | 'all', initialUrl?: string): Promise<number> => {
  let result: SaveJobsResponse | null = null;
  let totalJobs = 0;
  let jobsSavedCount = 0;
  let unwantedJobsCount = 0;

  const updateCounts = (result: SaveJobsResponse) => {
    totalJobs += result.totalJobs;
    jobsSavedCount += result.jobsSavedCount;
    unwantedJobsCount += result.unwantedJobsCount;
  };

  const start = new Date();
  const runAll = scrapersToRun === 'all';

  if (scrapersToRun === JobPlatform.STARTUP || runAll) {
    const startupScraper = new StartupScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await startupScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.GUPY || runAll) {
    const gupyScraper = new GupyScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await gupyScraper.saveJobs();
    updateCounts(result);
  }


  if (scrapersToRun === JobPlatform.LINKEDIN || runAll) {
    const linkedinScraper = new LinkedinScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await linkedinScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.PROGRAMATHOR || runAll) {
    const programathorScraper = new ProgramathorScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await programathorScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.REMOTAR || runAll) {
    const remotarScraper = new RemotarScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await remotarScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.TRAMPOS || runAll) {
    const tramposScraper = new TramposScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await tramposScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.VAGAS || runAll) {
    const vagasScraper = new VagasScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await vagasScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.DIVULGA_VAGAS || runAll) {
    const divulgaVagasScraper = new DivulgaVagasScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await divulgaVagasScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.COODESH || runAll) {
    const coodeshScraper = new CoodeshScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await coodeshScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.SOLIDES || runAll) {
    const solidesScraper = new SolidesScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await solidesScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.WE_WORK_REMOTELY || runAll) {
    const weWorkRemotelyScraper = new WeWorkRemotelyScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await weWorkRemotelyScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.REMOTEOK || runAll) {
    const remoteOkScraper = new RemoteOkScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await remoteOkScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.REMOTIFYEUROPE || runAll) {
    const remotifyEuropeScraper = new RemotifyEuropeScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await remotifyEuropeScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.INHIRE || runAll) {
    const inhireScraper = new InhireScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await inhireScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.FRONTENDBR || runAll) {
    const frontendBrScraper = new FrontendBrScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await frontendBrScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.REMOTEROCKETSHIP || runAll) {
    const remoteRocketshipScraper = new RemoteRocketshipScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await remoteRocketshipScraper.saveJobs();
    updateCounts(result);
  }

  if (scrapersToRun === JobPlatform.QUICKIN || runAll) {
    const quickinScraper = new QuickinScraper({ initialUrl: !runAll ? initialUrl : undefined });
    result = await quickinScraper.saveJobs();
    updateCounts(result);
  }

  const end = new Date();
  const durationInMinutes = ((end.getTime() - start.getTime()) / 60000).toFixed(2);

  if (totalJobs > 0) {
    console.log(`\n\n\x1b[43m Total jobs: ${totalJobs} \x1b[0m`);
    console.log(`\n\x1b[43m Number of saved jobs: ${jobsSavedCount} \x1b[0m`);
    console.log(`\x1b[43m Number of unwanted jobs: ${unwantedJobsCount} \x1b[0m`);
    console.log(`\x1b[43m Scraping duration: ${durationInMinutes} min \x1b[0m`);

    if (jobsSavedCount > 0) {
      await sendMessageToTelegram(`Scrapers executed!\n\nNumber of total jobs: ${totalJobs}\nNumber of saved jobs: ${jobsSavedCount}\nNumber of unwanted jobs: ${unwantedJobsCount}\n\nScraping duration: ${durationInMinutes} min`);
    }
  }

  return totalJobs;
}
