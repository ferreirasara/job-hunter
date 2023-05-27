import express = require("express")
import cors = require("cors")
import morgan = require("morgan")
import { AppDataSource } from "./data-source"
import JobOpportunityController from "./controllers/JobOpportunity.controller"

type PostJobBody = {
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

    const companyFilter = params.get('company');
    const cityilter = params.get('title');
    const platformFilter = params.get('platform');
    const descriptionFilter = params.get('description');
    const countryFilter = params.get('country');
    const stateFilter = params.get('state');
    const cityFilter = params.get('city');
    const appliedFilter = params.get('applied');
    const orderBy = params.get('orderBy');
    const limit = params.get('limit');
    const page = params.get('page');

    const result = await JobOpportunityController.getAllJobs({
      limit: parseInt(limit),
      page: parseInt(page),
      companyFilter,
      cityilter,
      platformFilter,
      descriptionFilter,
      countryFilter,
      stateFilter,
      cityFilter,
      appliedFilter,
      orderBy,
    });
    res.send({ totalOfJobs: result?.totalOfJobs, data: result?.data })
  })

  app.post('/job/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const body: PostJobBody = req.body;

    const updated = await JobOpportunityController.updateJob({ uuid, applied: body?.applied, discarded: body?.discarded })

    res.send(updated);
  })

  app.listen(PORT, () => {
    console.log(`Running in ${HOSTNAME}:${PORT}`)
  })
}).catch(error => console.log(error))
