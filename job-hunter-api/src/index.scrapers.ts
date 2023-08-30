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
  let numberOfNewJobs = 0;

  const gupyScraper = new GupyScraper({ filterExistentsJobs: true })
  numberOfNewJobs += await gupyScraper.saveJobs();

  const linkedinScraper = new LinkedinScraper({ filterExistentsJobs: true })
  numberOfNewJobs += await linkedinScraper.saveJobs();

  const programathorScraper = new ProgramathorScraper({ filterExistentsJobs: true })
  numberOfNewJobs += await programathorScraper.saveJobs();

  const remotarScraper = new RemotarScraper({ filterExistentsJobs: true })
  numberOfNewJobs += await remotarScraper.saveJobs();

  const tramposScraper = new TramposScraper({ filterExistentsJobs: true })
  numberOfNewJobs += await tramposScraper.saveJobs();

  const vagasScraper = new VagasScraper({ filterExistentsJobs: true })
  numberOfNewJobs += await vagasScraper.saveJobs();

  const jobatusScraper = new JObatusScraper({ filterExistentsJobs: true })
  numberOfNewJobs += await jobatusScraper.saveJobs();

  const divulgaVagasScraper = new DivulgaVagasScraper({ filterExistentsJobs: true })
  numberOfNewJobs += await divulgaVagasScraper.saveJobs();

  const coodeshScraper = new CoodeshScraper({ filterExistentsJobs: true })
  numberOfNewJobs += await coodeshScraper.saveJobs();

  console.log(`Number of new jobs: ${numberOfNewJobs}`);
}).catch(error => console.log(error))
