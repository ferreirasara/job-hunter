import { AppDataSource } from "./data-source"
import GupyScraper from "./scrapers/gupy.scraper";
import ProgramathorScraper from "./scrapers/programathor.scraper";
import TramposScraper from "./scrapers/trampos.scraper"

AppDataSource.initialize().then(async () => {
  const tramposScraper = new TramposScraper()
  await tramposScraper.saveJobs();

  const gupyScraper = new GupyScraper()
  await gupyScraper.saveJobs();

  const programathorScraper = new ProgramathorScraper()
  await programathorScraper.saveJobs();

}).catch(error => console.log(error))
