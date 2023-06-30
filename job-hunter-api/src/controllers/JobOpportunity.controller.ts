import { FindOptionsOrder, FindOptionsWhere, ILike, In, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../data-source";
import { JobOpportunity } from "../entity/JobOpportunity"
import { flatten, uniq } from "lodash";
import { calcContType, convertStrToArray, sendMessageToTelegram } from "../utils/utils";
import { JobInput, JobPlatform } from "../@types/types";

const getOrderBy = (orderByField: string, orderByOrder: string): FindOptionsOrder<JobOpportunity> => {
  if (orderByField === "createdAt") return { createdAt: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "platform") return { platform: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "company") return { company: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "title") return { title: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "type") return { type: orderByOrder === "ascend" ? "ASC" : "DESC" }
  if (orderByField === "hiringRegime") return { hiringRegime: orderByOrder === "ascend" ? "ASC" : "DESC" }
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
        company: jobInput.company,
        title: jobInput.title,
      }
    });

    if (!existentJob || (existentJob?.platform === jobInput?.platform && existentJob?.idInPlatform !== jobInput?.idInPlatform)) {
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
      newJob.type = jobInput.type;
      newJob.hiringRegime = jobInput.hiringRegime;
      newJob.skillsRating = jobInput.skillsRating;
      newJob.benefitsRating = jobInput.benefitsRating;
      newJob.totalRating = jobInput.skillsRating + jobInput.benefitsRating;
      newJob.applied = jobInput.applied;
      newJob.discarded = jobInput.discarded;

      try {
        const res = await AppDataSource.manager.save(newJob);
        return { success: true, uuid: res.uuid };
      } catch (e) {
        console.log(e)
        return null;
      }
    } else {
      const replyMarkup = {
        inline_keyboard: [[{ text: jobInput?.title, url: jobInput?.url }]]
      }
      await sendMessageToTelegram(`⚠️ Duplicated:\n\n*Title*: \`${jobInput?.title}\`\n*Company*: \`${jobInput?.company}\`\n*Platform*: \`${jobInput?.platform}\`\n*idInPlatform*: \`${jobInput.idInPlatform}\``, replyMarkup);
      return { success: false, message: 'Duplicated' };
    }
  }

  public static async getAllJobsWithFilter(args: {
    limit?: number,
    page?: number,
    platformFilter?: string,
    typeFilter?: string,
    hiringRegimeFilter?: string,
    skillFilter?: string,
    benefitRegimeFilter?: string,
    titleFilter?: string,
    companyFilter?: string,
    orderByField?: string,
    orderByOrder?: string,
    showOnlyDiscarded?: string
    showOnlyRecused?: string
    showOnlyNewJobs?: string
    showOnlyApplied?: string
  }) {
    const where: FindOptionsWhere<JobOpportunity> = {}

    where.discarded = args?.showOnlyDiscarded === 'true' || false
    where.recused = args?.showOnlyRecused === 'true' || false
    where.applied = args?.showOnlyApplied === 'true' || false

    if (args?.platformFilter) where.platform = In(args?.platformFilter?.split(','));
    if (args?.typeFilter) where.type = In(args?.typeFilter?.split(','));
    if (args?.hiringRegimeFilter) where.hiringRegime = In(args?.hiringRegimeFilter?.split(','));
    if (args?.skillFilter) {
      const skills = args?.skillFilter?.split(',')?.sort((a, b) => a.localeCompare(b));
      where.skills = ILike(`%${skills?.join("%")}%`);
    }
    if (args?.benefitRegimeFilter) {
      const benefits = args?.benefitRegimeFilter?.split(',')?.sort((a, b) => a.localeCompare(b));
      where.benefits = ILike(`%${benefits?.join("%")}%`);
    }
    if (args?.titleFilter) where.title = ILike(`%${args?.titleFilter}%`);
    if (args?.companyFilter) where.company = ILike(`%${args?.companyFilter}%`);
    if (args?.showOnlyNewJobs) {
      const date = new Date();
      date.setDate(date.getDate() - 2);
      where.createdAt = MoreThanOrEqual(date);
    }

    const jobs = await AppDataSource.manager.find(JobOpportunity, {
      skip: args?.page * args?.limit,
      take: args?.limit,
      where,
      order: getOrderBy(args?.orderByField, args?.orderByOrder)
    });

    const totalOfJobs = await AppDataSource.manager.count(JobOpportunity, { where });
    const allSkills = await this.getAllSkills({ unique: true, whereFilter: where });
    const allPlatforms = await this.getAllPlatforms({ unique: true, whereFilter: where });
    const allBenefits = await this.getAllBenefits({ unique: true, whereFilter: where });
    const allRatings = await AppDataSource.manager.find(JobOpportunity, { order: { totalRating: 'ASC' }, select: { totalRating: true }, where: { discarded: false } });

    return {
      totalOfJobs,
      data: jobs,
      allSkills,
      allPlatforms,
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
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { discarded, applied: false, recused: false });
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

  public static async updateDescription(uuid: string, description: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, { description });
    return response?.affected > 0;
  }

  public static async getAllJobsFromPlatform(platform: JobPlatform) {
    const jobs = await AppDataSource.manager.find(JobOpportunity, { where: { platform: platform } });
    return jobs;
  }

  private static async getAllSkills({ unique, considerDiscartedJobs, whereFilter }: { unique?: boolean, considerDiscartedJobs?: boolean, whereFilter?: FindOptionsWhere<JobOpportunity> }) {
    const where: FindOptionsWhere<JobOpportunity> = whereFilter;

    if (!considerDiscartedJobs) where.discarded = false;

    const allSkillStrs = await AppDataSource.manager.find(JobOpportunity, { where, select: { skills: true } });
    const allSkills = flatten(allSkillStrs?.map(cur => convertStrToArray(cur?.skills)));

    return unique ? uniq(allSkills?.filter(cur => !!cur))?.sort((a, b) => a.localeCompare(b)) : allSkills;
  }

  private static async getAllBenefits({ unique, considerDiscartedJobs, whereFilter }: { unique?: boolean, considerDiscartedJobs?: boolean, whereFilter?: FindOptionsWhere<JobOpportunity> }) {
    const where: FindOptionsWhere<JobOpportunity> = whereFilter;

    if (!considerDiscartedJobs) where.discarded = false;

    const allBeneftStrs = await AppDataSource.manager.find(JobOpportunity, { where, select: { benefits: true } });
    const allBenefits = flatten(allBeneftStrs?.map(cur => convertStrToArray(cur?.benefits)));

    return unique ? uniq(allBenefits?.filter(cur => !!cur))?.sort((a, b) => a.localeCompare(b)) : allBenefits;
  }

  private static async getAllPlatforms({ unique, considerDiscartedJobs, whereFilter }: { unique?: boolean, considerDiscartedJobs?: boolean, whereFilter?: FindOptionsWhere<JobOpportunity> }) {
    const where: FindOptionsWhere<JobOpportunity> = whereFilter;

    if (!considerDiscartedJobs) where.discarded = false;

    const allPlatformStrs = await AppDataSource.manager.find(JobOpportunity, { where, select: { platform: true } });
    const allPlatforms = flatten(allPlatformStrs?.map(cur => convertStrToArray(cur?.platform)));

    return unique ? uniq(allPlatforms?.filter(cur => !!cur))?.sort((a, b) => a.localeCompare(b)) : allPlatforms;
  }

  public static async getStats() {
    const jobsPerPlatform: { platform: string, count: string }[] = await AppDataSource.manager.query("SELECT platform, COUNT(uuid) FROM job_opportunity GROUP BY platform");
    const jobsPerCompany: { company: string, count: string }[] = await AppDataSource.manager.query("SELECT company, COUNT(uuid) FROM job_opportunity GROUP BY company");
    const jobsPerRating: { totalRating: number, count: string }[] = await AppDataSource.manager.query('SELECT "totalRating", COUNT(uuid) FROM job_opportunity GROUP BY "totalRating"');
    const jobsPerType: { type: string, count: string }[] = await AppDataSource.manager.query("SELECT type, COUNT(uuid) FROM job_opportunity GROUP BY type");
    const jobsPerHiringRegime: { hiringRegime: string, count: string }[] = await AppDataSource.manager.query('SELECT "hiringRegime", COUNT(uuid) FROM job_opportunity GROUP BY "hiringRegime"');
    const totalOfJobs = await AppDataSource.manager.count(JobOpportunity, { select: { uuid: true } });
    const totalOfAppliedJobs = await AppDataSource.manager.count(JobOpportunity, { select: { uuid: true }, where: { applied: true } });
    const totalOfDiscardedJobs = await AppDataSource.manager.count(JobOpportunity, { select: { uuid: true }, where: { discarded: true } });
    const totalOfRecusedJobs = await AppDataSource.manager.count(JobOpportunity, { select: { uuid: true }, where: { recused: true } });
    const totalOfRecusedJobsWithoutEnterview = await AppDataSource.manager.count(JobOpportunity, { select: { uuid: true }, where: { recused: true, numberOfInterviews: 0 } });
    const sumOfNumberOfInterviews = await AppDataSource.manager.sum(JobOpportunity, 'numberOfInterviews', { applied: true });
    const sumOfNumberOfTests = await AppDataSource.manager.sum(JobOpportunity, 'numberOfTests', { applied: true });
    const allSkills = await this.getAllSkills({ considerDiscartedJobs: true });
    const allBenefits = await this.getAllBenefits({ considerDiscartedJobs: true });

    return {
      jobsPerPlatform: jobsPerPlatform?.map(cur => ({ ...cur, count: parseInt(cur?.count) }))?.sort((a, b) => b.count - a.count),
      jobsPerCompany: jobsPerCompany?.map(cur => ({ ...cur, count: parseInt(cur?.count) }))?.sort((a, b) => b.count - a.count),
      jobsPerRating: jobsPerRating?.map(cur => ({ ...cur, count: parseInt(cur?.count) })),
      jobsPerType: jobsPerType?.map(cur => ({ ...cur, count: parseInt(cur?.count) }))?.sort((a, b) => b.count - a.count),
      jobsPerHiringRegime: jobsPerHiringRegime?.map(cur => ({ ...cur, count: parseInt(cur?.count) }))?.sort((a, b) => b.count - a.count),
      totalOfJobs,
      totalOfAppliedJobs,
      totalOfDiscardedJobs,
      totalOfRecusedJobs,
      totalOfRecusedJobsWithoutEnterview,
      medianOfInterviews: sumOfNumberOfInterviews / totalOfAppliedJobs,
      medianOfTests: sumOfNumberOfTests / totalOfAppliedJobs,
      skillsContType: calcContType(allSkills),
      benefitsContType: calcContType(allBenefits),
    }
  }
}
