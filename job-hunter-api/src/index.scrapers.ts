import { SaveJobsResponse } from './@types/types';
import { AppDataSource } from './data-source';
import CoodeshScraper from './scrapers/coodesh.scraper';
import DivulgaVagasScraper from './scrapers/divulgaVagas.scraper';
import GupyScraper from './scrapers/gupy.scraper';
import JobatusScraper from './scrapers/jobatus.scraper';
import LinkedinScraper from './scrapers/linkedin.scraper';
import ProgramathorScraper from './scrapers/programathor.scraper';
import RemotarScraper from './scrapers/remotar.scraper';
import TramposScraper from './scrapers/trampos.scraper';
import VagasScraper from './scrapers/vagas.scraper';

AppDataSource.initialize()
  .then(async () => {
    let result: SaveJobsResponse = null;
    let jobsSavedCount = 0;
    let jobsUnsavedCount = 0;
    let jobsDiscardedCount = 0;

    const updateCounts = (result: SaveJobsResponse) => {
      jobsSavedCount += result.jobsSavedCount;
      jobsUnsavedCount += result.jobsUnsavedCount;
      jobsDiscardedCount += result.jobsDiscardedCount;
    };

    const gupyScraper = new GupyScraper({});
    result = await gupyScraper.saveJobs();
    updateCounts(result);

    const linkedinScraper = new LinkedinScraper({});
    result = await linkedinScraper.saveJobs();
    updateCounts(result);

    const programathorScraper = new ProgramathorScraper({});
    result = await programathorScraper.saveJobs();
    updateCounts(result);

    const remotarScraper = new RemotarScraper({});
    result = await remotarScraper.saveJobs();
    updateCounts(result);

    const tramposScraper = new TramposScraper({});
    result = await tramposScraper.saveJobs();
    updateCounts(result);

    const vagasScraper = new VagasScraper({});
    result = await vagasScraper.saveJobs();
    updateCounts(result);

    const jobatusScraper = new JobatusScraper({});
    result = await jobatusScraper.saveJobs();
    updateCounts(result);

    const divulgaVagasScraper = new DivulgaVagasScraper({});
    result = await divulgaVagasScraper.saveJobs();
    updateCounts(result);

    const coodeshScraper = new CoodeshScraper({});
    result = await coodeshScraper.saveJobs();
    updateCounts(result);

    console.log(`\n\n\x1b[43m Number of saved jobs: ${jobsSavedCount} \x1b[0m`);
    console.log(`\x1b[43m Number of unsaved jobs: ${jobsUnsavedCount} \x1b[0m`);
    console.log(
      `\x1b[43m Number of discarded jobs: ${jobsDiscardedCount} \x1b[0m`,
    );
    console.log(
      `\x1b[43m Total of new jobs: ${jobsSavedCount - jobsDiscardedCount} \x1b[0m`,
    );
  })
  .catch((error) => console.log(error));
