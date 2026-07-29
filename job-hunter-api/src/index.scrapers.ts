import { ScrapersToRun } from './@types/types';
import { AppDataSource } from './data-source';
import { runScrapers } from './scrapers/run.scrapers';

AppDataSource.initialize()
  .then(async () => {
    const args = process.argv.slice(2);
    const scrapersToRun = args.length > 0 ? args : ['all'];

    await runScrapers(scrapersToRun as ScrapersToRun[]);
  })
  .catch((error) => console.log(error));
