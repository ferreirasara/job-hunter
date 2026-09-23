import express = require('express');
import cors = require('cors');
import morgan = require('morgan');
import { AppDataSource } from './data-source';
import JobOpportunityController from './controllers/JobOpportunity.controller';
import { runScrapers } from './scrapers/run.scrapers';

AppDataSource.initialize()
  .then(async () => {
    const PORT = 8080;
    const HOSTNAME = 'http://localhost';
    const app = express();

    app.use(morgan('short'));
    app.use(cors());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: false }));

    app.get('/jobs', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      const url = new URL(req.url, `${HOSTNAME}:${PORT}`);

      const params = url.searchParams;

      const platformFilter = params.get('platformFilter');
      const typeFilter = params.get('typeFilter');
      const hiringRegimeFilter = params.get('hiringRegimeFilter');
      const skillFilter = params.get('skillFilter');
      const benefitFilter = params.get('benefitFilter');
      const titleFilter = params.get('titleFilter');
      const companyFilter = params.get('companyFilter');
      const seniorityFilter = params.get('seniorityFilter');
      const showOnlyDiscarded = params.get('showOnlyDiscarded');
      const showOnlyRecused = params.get('showOnlyRecused');
      const showOnlyApplied = params.get('showOnlyApplied');
      const showOnlyUnwanted = params.get('showOnlyUnwanted');
      const orderByField = params.get('orderByField');
      const orderByOrder = params.get('orderByOrder');
      const limit = params.get('limit');
      const page = params.get('page');
      const showAllJobs = params.get('showAllJobs');

      if (!limit || !page) {
        res.send({ message: 'Invalid params' });
        return;
      }

      const result = await JobOpportunityController.getAllJobsWithFilter({
        limit: parseInt(limit),
        page: parseInt(page),
        platformFilter: platformFilter ? decodeURI(platformFilter) : undefined,
        typeFilter: typeFilter ? decodeURI(typeFilter) : undefined,
        hiringRegimeFilter: hiringRegimeFilter
          ? decodeURI(hiringRegimeFilter)
          : undefined,
        skillFilter: skillFilter ? decodeURI(skillFilter) : undefined,
        benefitFilter: benefitFilter ? decodeURI(benefitFilter) : undefined,
        titleFilter: titleFilter ? decodeURI(titleFilter) : undefined,
        companyFilter: companyFilter ? decodeURI(companyFilter) : undefined,
        seniorityFilter: seniorityFilter
          ? decodeURI(seniorityFilter)
          : undefined,
        showOnlyDiscarded: showOnlyDiscarded
          ? decodeURI(showOnlyDiscarded)
          : undefined,
        showOnlyRecused: showOnlyRecused
          ? decodeURI(showOnlyRecused)
          : undefined,
        showOnlyApplied: showOnlyApplied
          ? decodeURI(showOnlyApplied)
          : undefined,
        showOnlyUnwanted: showOnlyUnwanted
          ? decodeURI(showOnlyUnwanted)
          : undefined,
        orderByField: orderByField ? decodeURI(orderByField) : undefined,
        orderByOrder: orderByOrder ? decodeURI(orderByOrder) : undefined,
        showAllJobs: showAllJobs ? decodeURI(showAllJobs) : undefined,
      });
      res.send(result);
    });

    app.post('/job/:uuid/discarded', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      const uuid = req.params.uuid;
      const discarded = req.body?.discarded;

      const updated = await JobOpportunityController.updateDiscarded(uuid, discarded);
      res.send({ updated });
    });

    app.post('/job/:uuid/recused', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      const uuid = req.params.uuid;
      const recused = req.body?.recused;

      const updated = await JobOpportunityController.updateRecused(uuid, recused);
      res.send({ updated });
    });

    app.post('/job/:uuid/unwanted', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      const uuid = req.params.uuid;
      const unwanted = req.body?.unwanted;

      const updated = await JobOpportunityController.updateUnwanted(uuid, unwanted);
      res.send({ updated });
    });

    app.post('/job/:uuid/applied', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      const uuid = req.params.uuid;
      const applied = req.body?.applied;

      const updated = await JobOpportunityController.updateApplied(uuid, applied);
      res.send({ updated });
    });

    app.post('/job/:uuid/number-of-interviews', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      const uuid = req.params.uuid;
      const numberOfInterviews = req.body?.numberOfInterviews;

      const updated = await JobOpportunityController.updateNumberOfInterviews(uuid, numberOfInterviews);
      res.send({ updated });
    });

    app.post('/job/:uuid/number-of-tests', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      const uuid = req.params.uuid;
      const numberOfTests = req.body?.numberOfTests;

      const updated = await JobOpportunityController.updateNumberOfTests(uuid, numberOfTests);
      res.send({ updated });
    });

    app.get('/stats', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      const result = await JobOpportunityController.getStats();
      res.send(result);
    });

    app.post('/validate', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token', success: false });
        return;
      } else {
        res.send({ success: true });
        return;
      }
    });

    app.post('/run-scrapers', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      runScrapers('all');
      res.send({ message: 'Scrapers executed successfully' });
    });

    app.post('/import-job', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      const platform = req.body?.platform;
      const url = req.body?.url;

      if (!platform || !url) {
        res.send({ message: 'Platform and URL are required' });
        return;
      }

      const totalJobs = await runScrapers(platform, url);
      res.send({ message: 'Scrapers executed successfully', totalJobs });
    });

    app.all('/{*splat}', (_, res) => {
      res.status(404).send({ message: `Endpoint not found` });
    });

    app.listen(PORT, () => {
      console.log(`Running in ${HOSTNAME}:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
