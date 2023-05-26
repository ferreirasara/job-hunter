import express = require("express")
import cors = require("cors")
import morgan = require("morgan")
import { AppDataSource } from "./data-source"
import JobOpportunityController from "./controllers/JobOpportunity.controller"

AppDataSource.initialize().then(async () => {
  const PORT = 8080
  const HOSTNAME = 'http://localhost'
  const app = express()

  app.use(morgan('short'))
  app.use(cors())

  app.get('/jobs', async (req, res) => {
    const jobs = await JobOpportunityController.getAllJobs();
    res.send(jobs)
  })

  app.listen(PORT, () => {
    console.log(`Running in ${HOSTNAME}:${PORT}`)
  })
}).catch(error => console.log(error))
