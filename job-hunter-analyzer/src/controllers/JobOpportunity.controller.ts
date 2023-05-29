import { FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../data-source";
import { JobOpportunity } from "../entity/JobOpportunity"

export default class JobOpportunityController {
  public static async getJobs(where?: FindOptionsWhere<JobOpportunity> | FindOptionsWhere<JobOpportunity>[] | undefined) {
    const jobs = await AppDataSource.manager.find(JobOpportunity, { where });

    return jobs;
  }

  public static async updateSkills(uuid: string, skills: string) {
    const res = await AppDataSource.manager.update(JobOpportunity, uuid, { skills })
    return res.affected;
  }

  public static async updateSalaryRange(uuid: string, salaryRange: string) {
    const res = await AppDataSource.manager.update(JobOpportunity, uuid, { salaryRange })
    return res.affected;
  }
}