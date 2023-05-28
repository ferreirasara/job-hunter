import { AppDataSource } from "./data-source"
import { gupyScraper } from "./scrapers/gupy.scraper"
import { programathorScraper } from "./scrapers/programathor.scraper";
import { tramposScraper } from "./scrapers/trampos.scraper";

AppDataSource.initialize().then(async () => {
  await gupyScraper();
  await programathorScraper();
  await tramposScraper();
}).catch(error => console.log(error))
