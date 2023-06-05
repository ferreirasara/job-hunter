import { uniq } from "lodash";
import { getJobRating, getSkillsBasedOnDescription } from "./analyzer/analyzer";
import JobOpportunityController from "./controllers/JobOpportunity.controller";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(async () => {
  const allJobs = await JobOpportunityController.getAllJobs();
  for (const job of allJobs) {
    const skills = uniq(job?.skills?.split(',')?.map(cur => cur?.trim()));
    const benefits = uniq(job?.benefits?.split(',')?.map(cur => cur?.trim()));
    const rating = getJobRating({ benefits, rating: 0, skills });

    await JobOpportunityController.updateRatings(job.uuid, rating);
  }
}).catch(error => console.log(error))