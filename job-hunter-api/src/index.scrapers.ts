import { AppDataSource } from "./data-source"
import GupyScraper from "./scrapers/gupy.scraper";
import ProgramathorScraper from "./scrapers/programathor.scraper";
import TramposScraper from "./scrapers/trampos.scraper"
import VagasScraper from "./scrapers/vagas.scraper";

AppDataSource.initialize().then(async () => {
  // const tramposScraper = new TramposScraper()
  // await tramposScraper.saveJobs();

  // const gupyScraper = new GupyScraper()
  // await gupyScraper.saveJobs();

  // const programathorScraper = new ProgramathorScraper()
  // await programathorScraper.saveJobs();

  const vagasScraper = new VagasScraper()
  await vagasScraper.saveJobs();

}).catch(error => console.log(error))
