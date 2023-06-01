import { AppDataSource } from "./data-source"
import GupyScraper from "./scrapers/gupy.scraper";
import ProgramathorScraper from "./scrapers/programathor.scraper";
import RemotarScraper from "./scrapers/remotar.scraper";
import TramposScraper from "./scrapers/trampos.scraper"
import VagasScraper from "./scrapers/vagas.scraper";

AppDataSource.initialize().then(async () => {
  // const tramposScraper = new TramposScraper()
  // await tramposScraper.saveJobs();

  // const gupyScraper = new GupyScraper()
  // await gupyScraper.saveJobs();

  // const programathorScraper = new ProgramathorScraper()
  // await programathorScraper.saveJobs();

  // const vagasScraper = new VagasScraper()
  // await vagasScraper.saveJobs();

  const remotarScraper = new RemotarScraper()
  await remotarScraper.saveJobs();

}).catch(error => console.log(error))
