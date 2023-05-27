import { AppDataSource } from "./data-source"
import { gupyScraper } from "./scrapers/gupy.scraper"
import { programathorScraper } from "./scrapers/programathor.scraper";

AppDataSource.initialize().then(async () => {
  // await gupyScraper();
  await programathorScraper();
}).catch(error => console.log(error))
