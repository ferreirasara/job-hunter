import { AppDataSource } from "./data-source"
import GupyScraper from "./scrapers/gupy.scraper";
import ProgramathorScraper from "./scrapers/programathor.scraper";
import RemotarScraper from "./scrapers/remotar.scraper";
import TramposScraper from "./scrapers/trampos.scraper"
import VagasScraper from "./scrapers/vagas.scraper";

AppDataSource.initialize().then(async () => {
  let numberOfNewJobs = 0;

  const tramposScraper = new TramposScraper()
  numberOfNewJobs = await tramposScraper.saveJobs();

  const gupyScraper = new GupyScraper()
  numberOfNewJobs = await gupyScraper.saveJobs();

  const programathorScraper = new ProgramathorScraper()
  numberOfNewJobs = await programathorScraper.saveJobs();

  const vagasScraper = new VagasScraper()
  numberOfNewJobs = await vagasScraper.saveJobs();

  const remotarScraper = new RemotarScraper()
  numberOfNewJobs = await remotarScraper.saveJobs();

  console.log(`Number of new jobs: ${numberOfNewJobs}`);
}).catch(error => console.log(error))
