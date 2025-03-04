import express = require('express');
import cors = require('cors');
import morgan = require('morgan');
import { AppDataSource } from './data-source';
import JobOpportunityController from './controllers/JobOpportunity.controller';
import { UpdateJobBody } from './@types/types';

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
      const showOnlyNewJobs = params.get('showOnlyNewJobs');
      const showOnlyApplied = params.get('showOnlyApplied');
      const orderByField = params.get('orderByField');
      const orderByOrder = params.get('orderByOrder');
      const limit = params.get('limit');
      const page = params.get('page');

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
        showOnlyNewJobs: showOnlyNewJobs
          ? decodeURI(showOnlyNewJobs)
          : undefined,
        showOnlyApplied: showOnlyApplied
          ? decodeURI(showOnlyApplied)
          : undefined,
        orderByField: orderByField ? decodeURI(orderByField) : undefined,
        orderByOrder: orderByOrder ? decodeURI(orderByOrder) : undefined,
      });
      res.send(result);
    });

    app.post('/job/:uuid', async (req, res) => {
      const secretToken = req?.get('authorization');
      if (secretToken !== process.env.SECRET_TOKEN) {
        res.send({ message: 'Invalid Token' });
        return;
      }

      const uuid = req.params.uuid;
      const body: UpdateJobBody = req.body;

      let updated = null;

      if (body?.applied)
        updated = await JobOpportunityController.updateApplied(
          uuid,
          body?.applied,
        );
      if (body?.discarded)
        updated = await JobOpportunityController.updateDiscarded(
          uuid,
          body?.discarded,
        );
      if (body?.recused)
        updated = await JobOpportunityController.updateRecused(
          uuid,
          body?.recused,
        );
      if (body?.numberOfInterviews)
        updated = await JobOpportunityController.updateNumberOfInterviews(
          uuid,
          body?.numberOfInterviews,
        );
      if (body?.numberOfTests)
        updated = await JobOpportunityController.updateNumberOfTests(
          uuid,
          body?.numberOfTests,
        );

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

    app.listen(PORT, () => {
      console.log(`Running in ${HOSTNAME}:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
