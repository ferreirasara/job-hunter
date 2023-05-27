import { And, FindOptionsOrder, FindOptionsWhere, In, Like, Not } from "typeorm";
import { AppDataSource } from "../data-source";
import { JobOpportunity } from "../entity/JobOpportunity"

type UpdateJobInput = {
  uuid: string,
  applied?: boolean,
  discarded?: boolean,
}

export type OrderBy = { field: string, order: "ascend" | "descend" }

const getOrderBy = (orderByField: string, orderByOrder: string): FindOptionsOrder<JobOpportunity> => {
  if (orderByField === "country") return { country: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "company") return { company: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "title") return { title: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "description") return { description: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "country") return { country: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "state") return { state: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "city") return { city: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "platform") return { platform: orderByOrder === "ascend" ? "ASC" : "DESC" }
}

export default class JobOpportunityController {
  public static async getAllJobs(args: {
    limit?: number,
    page?: number,
    platformFilter?: string,
    countryFilter?: string,
    stateFilter?: string,
    cityFilter?: string,
    appliedFilter?: string,
    orderByField?: string,
    orderByOrder?: string,
  }) {
    const { limit, page, appliedFilter, cityFilter, countryFilter, orderByField, orderByOrder, platformFilter, stateFilter } = args;

    const where: FindOptionsWhere<JobOpportunity> = {}

    if (appliedFilter) where.applied = In(appliedFilter?.split(','));
    if (platformFilter) where.platform = In(platformFilter?.split(','));
    if (cityFilter) where.city = In(cityFilter?.split(','));
    if (countryFilter) where.country = In(countryFilter?.split(','));
    if (stateFilter) where.state = In(stateFilter?.split(','));

    const jobs = await AppDataSource.manager.find(JobOpportunity, {
      skip: page * limit,
      take: limit,
      where,
      order: getOrderBy(orderByField, orderByOrder)
    });

    const totalOfJobs = await AppDataSource.manager.count(JobOpportunity, { where, });

    const allCities = await AppDataSource.manager.find(JobOpportunity, { select: { city: true }, where: [{ city: Not(null) }, { city: Not("") }] });
    const allCountries = await AppDataSource.manager.find(JobOpportunity, { select: { country: true }, where: [{ country: Not(null) }, { country: Not("") }] });
    const allStates = await AppDataSource.manager.find(JobOpportunity, { select: { state: true }, where: [{ state: Not(null) }, { state: Not("") }] });

    return {
      totalOfJobs,
      data: jobs,
      allCities,
      allCountries,
      allStates,
    };
  }

  public static async updateJob(job: UpdateJobInput) {
    const response = await AppDataSource.manager.update(JobOpportunity, job.uuid, { applied: job.applied, discarded: job.discarded });
    return response?.affected > 0;
  }
}
