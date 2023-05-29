import { ArrayContains, FindOptionsOrder, FindOptionsWhere, In, Like, Not, Raw } from "typeorm";
import { AppDataSource } from "../data-source";
import { JobOpportunity } from "../entity/JobOpportunity"

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
}
