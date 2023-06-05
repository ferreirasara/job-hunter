import express = require("express")
import cors = require("cors")
import morgan = require("morgan")
import { AppDataSource } from "./data-source"
import JobOpportunityController, { JobInput } from "./controllers/JobOpportunity.controller"

type UpdateJobBody = {
  applied?: boolean
  discarded?: boolean
}

AppDataSource.initialize().then(async () => {
  const PORT = 8080
  const HOSTNAME = 'http://localhost'
  const app = express()

  app.use(morgan('short'))
  app.use(cors())
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: false }));

  app.get('/jobs', async (req, res) => {
    const url = new URL(req.url, `${HOSTNAME}:${PORT}`);

    const params = url.searchParams;

    const platformFilter = params.get('platformFilter');
    const appliedFilter = params.get('appliedFilter');
    const typeFilter = params.get('typeFilter');
    const showDiscarded = params.get('showDiscarded');
    const orderByField = params.get('orderByField');
    const orderByOrder = params.get('orderByOrder');
    const limit = params.get('limit');
    const page = params.get('page');

    if (!limit || !page) {
      res.send({ totalOfJobs: 0, data: [] })
      return
    }

    const result = await JobOpportunityController.getAllJobsWithFilter({
      limit: parseInt(limit),
      page: parseInt(page),
      platformFilter: platformFilter ? decodeURI(platformFilter) : undefined,
      appliedFilter: appliedFilter ? decodeURI(appliedFilter) : undefined,
      typeFilter: typeFilter ? decodeURI(typeFilter) : undefined,
      showDiscarded: showDiscarded ? decodeURI(showDiscarded) : undefined,
      orderByField: orderByField ? decodeURI(orderByField) : undefined,
      orderByOrder: orderByOrder ? decodeURI(orderByOrder) : undefined,
    });
    res.send(result);
  })

  app.post('/job/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const body: UpdateJobBody = req.body;

    let updated = null;

    if (body?.applied) updated = await JobOpportunityController.updateApplied(uuid, body?.applied);
    if (body?.discarded) updated = await JobOpportunityController.updateDiscarded(uuid, body?.discarded);

    res.send({ updated });
  })

  app.post('/job', async (req, res) => {
    const body: JobInput = req.body;
    const result = await JobOpportunityController.insert({
      company: body?.company,
      description: body?.description,
      platform: body?.platform,
      title: body?.title,
      url: body?.url,
      benefits: body?.benefits,
      city: body?.city,
      country: body?.country,
      salaryRange: body?.salaryRange,
      skills: body?.skills,
      state: body?.state,
      type: body?.type,
    })
    res.send(result);
  })

  app.listen(PORT, () => {
    console.log(`Running in ${HOSTNAME}:${PORT}`)
  })
}).catch(error => console.log(error))
