import { IsNull } from "typeorm"
import JobOpportunityController from "./controllers/JobOpportunity.controller"
import { AppDataSource } from "./data-source"
import { getBenefitsBasedOnDescription } from "./analyzer/analyzer";

AppDataSource.initialize().then(async () => {
  const jobsWithoutBenefits = await JobOpportunityController.getJobs({ benefits: IsNull() });
  for (const job of jobsWithoutBenefits) {
    const benefits = getBenefitsBasedOnDescription(job);
    await JobOpportunityController.updateBenefits(job.uuid, benefits?.join(','))
  }
}).catch(error => console.log(error))