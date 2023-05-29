import { IsNull } from "typeorm"
import JobOpportunityController from "./controllers/JobOpportunity.controller"
import { AppDataSource } from "./data-source"
import { getNormalizedSkill, getSkillsBasedOnDescription } from "./analyzer/analyzer";

AppDataSource.initialize().then(async () => {
  const jobsWithoutSkills = await JobOpportunityController.getJobs({ skills: IsNull() });
  for (const job of jobsWithoutSkills) {
    const skills = getSkillsBasedOnDescription(job);
    await JobOpportunityController.updateSkills(job.uuid, skills?.join(','))
  }
}).catch(error => console.log(error))