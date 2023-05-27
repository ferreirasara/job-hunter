import { AppDataSource } from "../data-source";
import { JobOpportunity } from "../entity/JobOpportunity"

type UpdateJobInput = {
  uuid: string,
  applied?: boolean,
  discarded?: boolean,
}

export default class JobOpportunityController {
  public static async getAllJobs(args: {
    limit?: number,
    page?: number,
    companyFilter?: string,
    cityilter?: string,
    platformFilter?: string,
    descriptionFilter?: string,
    countryFilter?: string,
    stateFilter?: string,
    cityFilter?: string,
    appliedFilter?: string,
    orderBy?: string,
  }) {
    const { limit, page, appliedFilter, cityFilter, cityilter, companyFilter, countryFilter, descriptionFilter, orderBy, platformFilter, stateFilter } = args;
    const jobs = await AppDataSource.manager.find(JobOpportunity, { skip: page * limit, take: limit });
    const totalOfJobs = await AppDataSource.manager.count(JobOpportunity);
    return { totalOfJobs, data: jobs };
  }

  public static async updateJob(job: UpdateJobInput) {
    const response = await AppDataSource.manager.update(JobOpportunity, job.uuid, { applied: job.applied, discarded: job.discarded });
    return response?.affected > 0;
  }
}
