import { JobPlatform } from './@types/types';
import { AppDataSource } from './data-source';
import { runScrapers } from './scrapers/run.scrapers';

AppDataSource.initialize()
  .then(async () => {
    const args = process.argv.slice(2);
    const scrapersToRun = args.length === 1 ? args[0] : 'all';

    await runScrapers(scrapersToRun as JobPlatform | 'all');
  })
  .catch((error) => console.log(error));
