import { uniq } from "lodash";
import { getSkillsBasedOnDescription } from "./analyzer/analyzer";
import JobOpportunityController from "./controllers/JobOpportunity.controller";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(async () => {
  const allJobs = await JobOpportunityController.getAllJobs();
  for (const job of allJobs) {
    const newSkills = uniq(job?.skills?.split(',')?.map(cur => cur?.trim()))
    // const newSkills = getSkillsBasedOnDescription({ description: job.description, skills: job.skills?.split(',') });
    await JobOpportunityController.updateSkills(job.uuid, newSkills?.join(','));
  }
}).catch(error => console.log(error))