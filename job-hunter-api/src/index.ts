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
    const jobs = await JobOpportunityController.getAllJobs();
    res.send(jobs)
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
