import { ArrayContains, FindOptionsOrder, FindOptionsWhere, In, Like, Not, Raw } from "typeorm";
import { AppDataSource } from "../data-source";
import { JobOpportunity } from "../entity/JobOpportunity"

export type JobPlatform = "GUPY" | "PROGRAMATHOR" | "TRAMPOS" | "VAGAS"
export type JobType = "REMOTE" | "HYBRID" | "FACE_TO_FACE"
export type JobInitialData = { url: string, idInPlatform: string }

export type JobInput = {
  company: string
  platform: JobPlatform
  title: string
  description: string
  url: string
  country?: string
  state?: string
  city?: string
  idInPlatform?: string
  skills?: string
  benefits?: string
  salaryRange?: string
  type?: JobType
}

type UpdateJobInput = {
  uuid: string,
  applied?: boolean,
  discarded?: boolean,
}

export type OrderBy = { field: string, order: "ascend" | "descend" }

const getOrderBy = (orderByField: string, orderByOrder: string): FindOptionsOrder<JobOpportunity> => {
  if (orderByField === "createdAt") return { createdAt: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "platform") return { platform: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "company") return { company: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "title") return { title: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "type") return { type: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "salaryRange") return { salaryRange: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "skills") return { skills: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "applied") return { applied: orderByOrder === "ascend" ? "ASC" : "DESC" }

  return { createdAt: "DESC" }
}

export default class JobOpportunityController {
  public static async insert(jobInput: JobInput) {
    const existentJob = await AppDataSource.manager.findOne(JobOpportunity, {
      where: {
        platform: jobInput.platform,
        company: jobInput.company,
        title: jobInput.title,
      }
    });

    if (!existentJob) {
      const newJob = new JobOpportunity();
      newJob.company = jobInput.company;
      newJob.description = jobInput.description;
      newJob.platform = jobInput.platform;
      newJob.title = jobInput.title;
      newJob.idInPlatform = jobInput.idInPlatform;
      newJob.country = jobInput.country;
      newJob.state = jobInput.state;
      newJob.city = jobInput.city;
      newJob.url = jobInput.url;
      newJob.skills = jobInput.skills;
      newJob.benefits = jobInput.benefits;
      newJob.salaryRange = jobInput.salaryRange;
      newJob.type = jobInput.type;

      try {
        const res = await AppDataSource.manager.save(newJob);
        return res.uuid;
      } catch (e) {
        console.log(e)
        return null;
      }
    } else {
      return null;
    }
  }

  public static async getAllJobs(args: {
    limit?: number,
    page?: number,
    platformFilter?: string,
    appliedFilter?: string,
    typeFilter?: string,
    orderByField?: string,
    orderByOrder?: string,
  }) {
    const { limit, page, appliedFilter, orderByField, orderByOrder, platformFilter, typeFilter } = args;

    const where: FindOptionsWhere<JobOpportunity> = {}

    where.discarded = false
    if (appliedFilter) where.applied = In(appliedFilter?.split(','));
    if (platformFilter) where.platform = In(platformFilter?.split(','));
    if (typeFilter) where.type = In(typeFilter?.split(','));

    const jobs = await AppDataSource.manager.find(JobOpportunity, {
      skip: page * limit,
      take: limit,
      where,
      order: getOrderBy(orderByField, orderByOrder)
    });

    const totalOfJobs = await AppDataSource.manager.count(JobOpportunity, { where });

    return {
      totalOfJobs,
      data: jobs,
    };
  }

  public static async updateJob(job: UpdateJobInput) {
    const response = await AppDataSource.manager.update(JobOpportunity, job.uuid, { applied: job.applied, discarded: job.discarded });
    return response?.affected > 0;
  }

  public static async updateSkills(uuid: string, skills: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { skills });
    return response?.affected > 0;
  }

  public static async getAllJobsFromPlatform(platform: JobPlatform) {
    const jobs = await AppDataSource.manager.find(JobOpportunity, { where: { platform: platform } });
    return jobs;
  }
}
