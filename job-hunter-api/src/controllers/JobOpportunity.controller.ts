import { FindOptionsOrder, FindOptionsWhere, ILike, In, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../data-source";
import { JobOpportunity } from "../entity/JobOpportunity"
import { flatten, uniq } from "lodash";
import { calcContType, convertStrToArray } from "../utils/utils";

export type JobPlatform = "GUPY" | "PROGRAMATHOR" | "TRAMPOS" | "VAGAS" | "REMOTAR" | "LINKEDIN"
export type JobType = "REMOTE" | "HYBRID" | "FACE_TO_FACE"
export type HiringRegime = "CLT" | "PJ"
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
  hiringRegime?: HiringRegime
  skillsRating?: number
  benefitsRating?: number
  applied?: boolean
}

export type OrderBy = { field: string, order: "ascend" | "descend" }

const getOrderBy = (orderByField: string, orderByOrder: string): FindOptionsOrder<JobOpportunity> => {
  if (orderByField === "createdAt") return { createdAt: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "platform") return { platform: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "company") return { company: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "title") return { title: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "type") return { type: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "hiringRegime") return { hiringRegime: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "salaryRange") return { salaryRange: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "skills") return { skills: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "applied") return { applied: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "skillsRating") return { skillsRating: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "benefitsRating") return { benefitsRating: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "totalRating") return { totalRating: orderByOrder === "ascend" ? "ASC" : "DESC" }

  return { createdAt: "DESC" }
}

export default class JobOpportunityController {
  public static async insert(jobInput: JobInput): Promise<{ success: boolean, uuid?: string, message?: string }> {
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
      newJob.hiringRegime = jobInput.hiringRegime;
      newJob.skillsRating = jobInput.skillsRating;
      newJob.benefitsRating = jobInput.benefitsRating;
      newJob.totalRating = jobInput.skillsRating + jobInput.benefitsRating;
      newJob.applied = jobInput.applied;

      try {
        const res = await AppDataSource.manager.save(newJob);
        return { success: true, uuid: res.uuid };
      } catch (e) {
        console.log(e)
        return null;
      }
    } else {
      return { success: false, message: 'Duplicated' };
    }
  }

  public static async getAllJobsWithFilter(args: {
    limit?: number,
    page?: number,
    platformFilter?: string,
    appliedFilter?: string,
    typeFilter?: string,
    hiringRegimeFilter?: string,
    skillFilter?: string,
    benefitRegimeFilter?: string,
    orderByField?: string,
    orderByOrder?: string,
    showOnlyDiscarded?: string
    showOnlyNewJobs?: string
  }) {
    const { limit, page, appliedFilter, orderByField, orderByOrder, platformFilter, typeFilter, hiringRegimeFilter, skillFilter, benefitRegimeFilter, showOnlyDiscarded, showOnlyNewJobs } = args;

    const where: FindOptionsWhere<JobOpportunity> = {}

    where.discarded = showOnlyDiscarded === 'true' || false
    where.recused = false
    if (appliedFilter) where.applied = In(appliedFilter?.split(','));
    if (platformFilter) where.platform = In(platformFilter?.split(','));
    if (typeFilter) where.type = In(typeFilter?.split(','));
    if (hiringRegimeFilter) where.hiringRegime = In(hiringRegimeFilter?.split(','));
    if (skillFilter) {
      const skills = skillFilter?.split(',')?.sort((a, b) => a.localeCompare(b));
      where.skills = ILike(`%${skills?.join("%")}%`);
    }
    if (benefitRegimeFilter) {
      const benefits = benefitRegimeFilter?.split(',')?.sort((a, b) => a.localeCompare(b));
      where.benefits = ILike(`%${benefits?.join("%")}%`);
    }
    if (showOnlyNewJobs) {
      const date = new Date();
      date.setDate(date.getDate() - 2);
      where.createdAt = MoreThanOrEqual(date);
    }

    const jobs = await AppDataSource.manager.find(JobOpportunity, {
      skip: page * limit,
      take: limit,
      where,
      order: getOrderBy(orderByField, orderByOrder)
    });

    const totalOfJobs = await AppDataSource.manager.count(JobOpportunity, { where });
    const allSkills = await this.getAllSkills({ unique: true });
    const allBenefits = await this.getAllBenefits({ unique: true });
    const allRatings = await AppDataSource.manager.find(JobOpportunity, { order: { totalRating: 'ASC' }, select: { totalRating: true }, where: { discarded: false } });

    return {
      totalOfJobs,
      data: jobs,
      allSkills,
      allBenefits,
      allRatings: allRatings.map(cur => cur?.totalRating),
    };
  }

  public static async getAllJobs() {
    const jobs = await AppDataSource.manager.find(JobOpportunity);
    return jobs;
  }

  public static async getJobByUuid(uuid: string) {
    const job = await AppDataSource.manager.findOne(JobOpportunity, { where: { uuid } });
    return job;
  }

  public static async updateApplied(uuid: string, applied: boolean) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { applied });
    return response?.affected > 0;
  }

  public static async updateDiscarded(uuid: string, discarded: boolean) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { discarded });
    return response?.affected > 0;
  }

  public static async updateRecused(uuid: string, recused: boolean) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { recused });
    return response?.affected > 0;
  }

  public static async updateNumberOfInterviews(uuid: string, numberOfInterviews: number) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { numberOfInterviews });
    return response?.affected > 0;
  }

  public static async updateNumberOfTests(uuid: string, numberOfTests: number) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { numberOfTests });
    return response?.affected > 0;
  }

  public static async updateSkills(uuid: string, skills: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { skills });
    return response?.affected > 0;
  }

  public static async updateBenefits(uuid: string, benefits: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { benefits });
    return response?.affected > 0;
  }

  public static async updateRatings(uuid: string, rating: { skillsRating?: number, benefitsRating?: number }) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      skillsRating: rating.skillsRating,
      benefitsRating: rating.benefitsRating,
      totalRating: rating.skillsRating + rating.benefitsRating,
    });
    return response?.affected > 0;
  }

  public static async updateType(uuid: string, type: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { type });
    return response?.affected > 0;
  }

  public static async updateHiringRegime(uuid: string, hiringRegime: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { hiringRegime });
    return response?.affected > 0;
  }

  public static async getAllJobsFromPlatform(platform: JobPlatform) {
    const jobs = await AppDataSource.manager.find(JobOpportunity, { where: { platform: platform } });
    return jobs;
  }

  private static async getAllSkills({ unique, considerDiscartedJobs }: { unique?: boolean, considerDiscartedJobs?: boolean }) {
    const where: FindOptionsWhere<JobOpportunity> = {}

    if (!considerDiscartedJobs) where.discarded = false;

    const allSkillStrs = await AppDataSource.manager.find(JobOpportunity, { where, select: { skills: true } });
    const allSkills = flatten(allSkillStrs?.map(cur => convertStrToArray(cur?.skills)));

    return unique ? uniq(allSkills)?.sort((a, b) => a.localeCompare(b)) : allSkills;
  }

  private static async getAllBenefits({ unique, considerDiscartedJobs }: { unique?: boolean, considerDiscartedJobs?: boolean }) {
    const where: FindOptionsWhere<JobOpportunity> = {}

    if (!considerDiscartedJobs) where.discarded = false;

    const allBeneftStrs = await AppDataSource.manager.find(JobOpportunity, { where, select: { benefits: true } });
    const allBenefits = flatten(allBeneftStrs?.map(cur => convertStrToArray(cur?.benefits)));

    return unique ? uniq(allBenefits)?.sort((a, b) => a.localeCompare(b)) : allBenefits;
  }

  public static async getStats() {
    const jobsPerPlatform: { platform: string, count: string }[] = await AppDataSource.manager.query("SELECT platform, COUNT(uuid) FROM job_opportunity GROUP BY platform");
    const jobsPerCompany: { company: string, count: string }[] = await AppDataSource.manager.query("SELECT company, COUNT(uuid) FROM job_opportunity GROUP BY company");
    const jobsPerRating: { totalRating: number, count: string }[] = await AppDataSource.manager.query('SELECT "totalRating", COUNT(uuid) FROM job_opportunity GROUP BY "totalRating"');
    const totalOfJobs = await AppDataSource.manager.count(JobOpportunity, { select: { uuid: true } });
    const totalOfAppliedJobs = await AppDataSource.manager.count(JobOpportunity, { select: { uuid: true }, where: { applied: true } });
    const totalOfDiscardedJobs = await AppDataSource.manager.count(JobOpportunity, { select: { uuid: true }, where: { discarded: true } });
    const allSkills = await this.getAllSkills({ considerDiscartedJobs: true });
    const allBenefits = await this.getAllBenefits({ considerDiscartedJobs: true });

    return {
      jobsPerPlatform: jobsPerPlatform?.map(cur => ({ ...cur, count: parseInt(cur?.count) }))?.sort((a, b) => b.count - a.count),
      jobsPerCompany: jobsPerCompany?.map(cur => ({ ...cur, count: parseInt(cur?.count) }))?.sort((a, b) => b.count - a.count),
      jobsPerRating: jobsPerRating?.map(cur => ({ ...cur, count: parseInt(cur?.count) })),
      totalOfJobs,
      totalOfAppliedJobs,
      totalOfDiscardedJobs,
      skillsContType: calcContType(allSkills),
      benefitsContType: calcContType(allBenefits),
    }
  }
}
