import { SaveJobsResponse } from "./@types/types";
import { AppDataSource } from "./data-source"
import CoodeshScraper from "./scrapers/coodesh.scraper";
import DivulgaVagasScraper from "./scrapers/divulgaVagas.scraper";
import GupyScraper from "./scrapers/gupy.scraper";
import JObatusScraper from "./scrapers/jobatus.scraper";
import LinkedinScraper from "./scrapers/linkedin.scraper";
import ProgramathorScraper from "./scrapers/programathor.scraper";
import RemotarScraper from "./scrapers/remotar.scraper";
import TramposScraper from "./scrapers/trampos.scraper"
import VagasScraper from "./scrapers/vagas.scraper";

AppDataSource.initialize().then(async () => {
  let result: SaveJobsResponse = null
  let jobsSavedCount = 0;
  let jobsUnsavedCount = 0;
  let jobsDiscardedCount = 0;

  const updateCounts = (result: SaveJobsResponse) => {
    jobsSavedCount += result.jobsSavedCount;
    jobsUnsavedCount += result.jobsUnsavedCount;
    jobsDiscardedCount += result.jobsDiscardedCount;
  }

  const gupyScraper = new GupyScraper({ filterExistentsJobs: true })
  result = await gupyScraper.saveJobs();
  updateCounts(result);

  const linkedinScraper = new LinkedinScraper({ filterExistentsJobs: true })
  result = await linkedinScraper.saveJobs();
  updateCounts(result);

  const programathorScraper = new ProgramathorScraper({ filterExistentsJobs: true })
  result = await programathorScraper.saveJobs();
  updateCounts(result);

  const remotarScraper = new RemotarScraper({ filterExistentsJobs: true })
  result = await remotarScraper.saveJobs();
  updateCounts(result);

  const tramposScraper = new TramposScraper({ filterExistentsJobs: true })
  result = await tramposScraper.saveJobs();
  updateCounts(result);

  const vagasScraper = new VagasScraper({ filterExistentsJobs: true })
  result = await vagasScraper.saveJobs();
  updateCounts(result);

  const jobatusScraper = new JObatusScraper({ filterExistentsJobs: true })
  result = await jobatusScraper.saveJobs();
  updateCounts(result);

  // const divulgaVagasScraper = new DivulgaVagasScraper({ filterExistentsJobs: true })
  // numberOfNewJobs += await divulgaVagasScraper.saveJobs();

  const coodeshScraper = new CoodeshScraper({ filterExistentsJobs: true })
  result = await coodeshScraper.saveJobs();
  updateCounts(result);

  console.log(`\n\n\x1b[43m Number of saved jobs: ${jobsSavedCount} \x1b[0m`);
  console.log(`\x1b[43m Number of unsaved jobs: ${jobsUnsavedCount} \x1b[0m`);
  console.log(`\x1b[43m Number of discarded jobs: ${jobsDiscardedCount} \x1b[0m`);
  console.log(`\x1b[43m Total of new jobs: ${jobsSavedCount - jobsDiscardedCount} \x1b[0m`);
}).catch(error => console.log(error))
