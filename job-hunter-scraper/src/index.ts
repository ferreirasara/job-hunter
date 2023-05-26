import { AppDataSource } from "./data-source"
import { gupyScraper } from "./scrapers/gupy.scraper"

AppDataSource.initialize().then(async () => {
  await gupyScraper();
}).catch(error => console.log(error))
