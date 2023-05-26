import { AppDataSource } from "../data-source";
import { JobOpportunity } from "../entity/JobOpportunity"

export default class JobOpportunityController {
  public static async getAllJobs() {
    const jobs = await AppDataSource.manager.find(JobOpportunity);
    return jobs;
  }
}