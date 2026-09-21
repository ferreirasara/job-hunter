import { flatten, uniq } from 'lodash';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  MoreThanOrEqual,
} from 'typeorm';
import { JobBenefit, JobInput, JobPlatform, JobSkill } from '../@types/types';
import { AppDataSource } from '../data-source';
import { JobOpportunity } from '../entity/JobOpportunity';
import { convertStrToArray, getJobRegex } from '../utils/utils';

const getOrderBy = (
  orderByField: string,
  orderByOrder: string,
): FindOptionsOrder<JobOpportunity> => {
  // secondary key guarantees a deterministic order for rows tied on the primary field
  const tiebreaker = { uuid: 'ASC' } as const;

  if (!orderByField) return { createdAt: 'DESC', ...tiebreaker };

  if (orderByField === 'createdAt')
    return { createdAt: orderByOrder === 'ascend' ? 'ASC' : 'DESC', ...tiebreaker };
  if (orderByField === 'platform')
    return { platform: orderByOrder === 'ascend' ? 'ASC' : 'DESC', ...tiebreaker };
  if (orderByField === 'company')
    return { company: orderByOrder === 'ascend' ? 'ASC' : 'DESC', ...tiebreaker };
  if (orderByField === 'title')
    return { title: orderByOrder === 'ascend' ? 'ASC' : 'DESC', ...tiebreaker };
  if (orderByField === 'type')
    return { type: orderByOrder === 'ascend' ? 'ASC' : 'DESC', ...tiebreaker };
  if (orderByField === 'hiringRegime')
    return { hiringRegime: orderByOrder === 'ascend' ? 'ASC' : 'DESC', ...tiebreaker };
  if (orderByField === 'skills')
    return { skills: orderByOrder === 'ascend' ? 'ASC' : 'DESC', ...tiebreaker };
  if (orderByField === 'totalRating')
    return { totalRating: orderByOrder === 'ascend' ? 'ASC' : 'DESC', ...tiebreaker };
  if (orderByField === 'seniority')
    return { seniority: orderByOrder === 'ascend' ? 'ASC' : 'DESC', ...tiebreaker };

  return { createdAt: 'DESC', ...tiebreaker };
};

export default class JobOpportunityController {
  public static async insert(
    jobInput: JobInput,
  ): Promise<{ success: boolean; uuid?: string; message?: 'Duplicated' | string }> {
    const existentJob = await AppDataSource.manager.findOne(JobOpportunity, {
      where: {
        company: jobInput.company,
        title: jobInput.title,
        idInPlatform: jobInput.idInPlatform,
        createdAt: MoreThanOrEqual(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)), // Check for jobs created in the last 30 days
      },
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
      newJob.type = jobInput.type;
      newJob.hiringRegime = jobInput.hiringRegime;
      newJob.skillsRating = jobInput.skillsRating;
      newJob.benefitsRating = jobInput.benefitsRating;
      newJob.totalRating = (jobInput?.skillsRating || 0) + (jobInput?.benefitsRating || 0);
      newJob.applied = jobInput.applied || false;
      newJob.discarded = jobInput.discarded || false;
      newJob.unwanted = jobInput.unwanted || false;
      newJob.seniority = jobInput.seniority;

      try {
        const res = await AppDataSource.manager.save(newJob);
        return { success: true, uuid: res.uuid };
      } catch (e) {
        console.log(e);
        return { success: false, message: 'Error on saving job' };
      }
    } else {
      return { success: false, message: 'Duplicated' };
    }
  }

  public static async getAllJobsWithFilter(args: {
    limit?: number;
    page?: number;
    platformFilter?: string;
    typeFilter?: string;
    hiringRegimeFilter?: string;
    skillFilter?: string;
    benefitFilter?: string;
    titleFilter?: string;
    companyFilter?: string;
    seniorityFilter?: string;
    orderByField?: string;
    orderByOrder?: string;
    showOnlyDiscarded?: string;
    showOnlyRecused?: string;
    showOnlyApplied?: string;
    showOnlyUnwanted?: string;
    showAllJobs?: string;
  }) {
    const where: FindOptionsWhere<JobOpportunity> = { };

    where.discarded = args?.showOnlyDiscarded === 'true' || false;
    where.recused = args?.showOnlyRecused === 'true' || false;
    where.applied = args?.showOnlyApplied === 'true' || false;
    where.unwanted = args?.showOnlyUnwanted === 'true' || false;
    if (args?.showAllJobs === 'true') {
      delete where.discarded;
      delete where.recused;
      delete where.applied;
      delete where.unwanted;
    }

    if (args?.platformFilter)
      where.platform = In(args?.platformFilter?.split(','));
    if (args?.typeFilter) where.type = In(args?.typeFilter?.split(','));
    if (args?.hiringRegimeFilter)
      where.hiringRegime = In(args?.hiringRegimeFilter?.split(','));
    if (args?.skillFilter) where.skills = ILike(`%${args?.skillFilter}%`);
    if (args?.benefitFilter) where.benefits = ILike(`%${args?.benefitFilter}%`);
    if (args?.titleFilter) where.title = ILike(`%${args?.titleFilter}%`);
    if (args?.companyFilter) where.company = ILike(`%${args?.companyFilter}%`);
    if (args?.seniorityFilter)
      where.seniority = ILike(`%${args?.seniorityFilter}%`);

    const jobs = await AppDataSource.manager.find(JobOpportunity, {
      skip: (args?.page || 0) * (args?.limit || 10),
      take: args?.limit,
      where,
      order: getOrderBy(args?.orderByField || 'createdAt', args?.orderByOrder || 'descend'),
    });

    const jobsWithRegex = jobs?.map((job) => ({
      ...job,
      regex: getJobRegex(job),
    }));

    const totalOfJobs = await AppDataSource.manager.count(JobOpportunity, {
      where,
      select: { uuid: true },
    });
    const allRatings = await AppDataSource.manager.find(JobOpportunity, {
      order: { totalRating: 'ASC' },
      select: { totalRating: true },
      where: { discarded: false, unwanted: false },
    });

    return {
      totalOfJobs,
      data: jobsWithRegex,
      allRatings: allRatings.map((cur) => cur?.totalRating),
      allSkills: Object.keys(JobSkill)?.sort((a, b) => (a || '')?.localeCompare(b || '')),
      allBenefits: Object.keys(JobBenefit)?.sort((a, b) => (a || '')?.localeCompare(b || '')),
    };
  }

  public static async getAllJobs() {
    const jobs = await AppDataSource.manager.find(JobOpportunity);
    return jobs;
  }

  public static async getJobByUuid(uuid: string) {
    const job = await AppDataSource.manager.findOne(JobOpportunity, {
      where: { uuid },
    });
    return job;
  }

  public static async updateApplied(uuid: string, applied: boolean) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      applied,
      unwanted: false,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateDiscarded(uuid: string, discarded: boolean) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      discarded,
      applied: false,
      recused: false,
      unwanted: false,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateUnwanted(uuid: string, unwanted: boolean) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      unwanted,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateRecused(uuid: string, recused: boolean) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      recused,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateNumberOfInterviews(
    uuid: string,
    numberOfInterviews: number,
  ) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      numberOfInterviews,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateNumberOfTests(uuid: string, numberOfTests: number) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      numberOfTests,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateSkills(uuid: string, skills: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      skills,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateBenefits(uuid: string, benefits: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      benefits,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateRatings(
    uuid: string,
    rating: { skillsRating?: number; benefitsRating?: number },
  ) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      skillsRating: rating.skillsRating,
      benefitsRating: rating.benefitsRating,
      totalRating: (rating?.skillsRating || 0) + (rating?.benefitsRating || 0),
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateType(uuid: string, type: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      type,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateHiringRegime(uuid: string, hiringRegime: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      hiringRegime,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateSeniority(uuid: string, seniority: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      seniority,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateDescription(uuid: string, description: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      description,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async updateUrl(uuid: string, url: string) {
    const response = await AppDataSource.manager.update(JobOpportunity, uuid, {
      url,
    });
    return response?.affected && response?.affected > 0;
  }

  public static async getAllJobsFromPlatform(platform: JobPlatform) {
    const jobs = await AppDataSource.manager.find(JobOpportunity, {
      where: { platform: platform },
    });
    return jobs;
  }

  public static async getStats() {
    const jobsPerPlatform: { platform: string; count: string }[] =
      await AppDataSource.manager.query(
        'SELECT platform, COUNT(uuid) FROM job_opportunity WHERE unwanted = false GROUP BY platform',
      );
    const jobsPerCompany: { company: string; count: string }[] =
      await AppDataSource.manager.query(
        'SELECT company, COUNT(uuid) FROM job_opportunity WHERE unwanted = false GROUP BY company',
      );
    const jobsPerRating: { totalRating: number; count: string }[] =
      await AppDataSource.manager.query(
        'SELECT "totalRating", COUNT(uuid) FROM job_opportunity WHERE unwanted = false GROUP BY "totalRating"',
      );
    const jobsPerType: { type: string; count: string }[] =
      await AppDataSource.manager.query(
        'SELECT type, COUNT(uuid) FROM job_opportunity WHERE unwanted = false GROUP BY type',
      );
    const jobsPerHiringRegime: { hiringRegime: string; count: string }[] =
      await AppDataSource.manager.query(
        'SELECT "hiringRegime", COUNT(uuid) FROM job_opportunity WHERE unwanted = false GROUP BY "hiringRegime"',
      );
    const totalOfJobs = await AppDataSource.manager.count(JobOpportunity, {
      select: { uuid: true },
    });
    const totalOfAppliedJobs = await AppDataSource.manager.count(
      JobOpportunity,
      { select: { uuid: true }, where: { applied: true } },
    );
    const totalOfDiscardedJobs = await AppDataSource.manager.count(
      JobOpportunity,
      { select: { uuid: true }, where: { discarded: true } },
    );
    const totalOfRecusedJobs = await AppDataSource.manager.count(
      JobOpportunity,
      { select: { uuid: true }, where: { recused: true } },
    );
    const totalOfUnwantedJobs = await AppDataSource.manager.count(
      JobOpportunity,
      { select: { uuid: true }, where: { unwanted: true } },
    );
    const totalOfRecusedJobsWithoutEnterview =
      await AppDataSource.manager.count(JobOpportunity, {
        select: { uuid: true },
        where: { recused: true, numberOfInterviews: 0 },
      });
    const sumOfNumberOfInterviews = await AppDataSource.manager.sum(
      JobOpportunity,
      'numberOfInterviews',
      { applied: true },
    ) || 0;
    const sumOfNumberOfTests = await AppDataSource.manager.sum(
      JobOpportunity,
      'numberOfTests',
      { applied: true },
    ) || 0;
    const sumOfTotalRatings = await AppDataSource.manager.sum(
      JobOpportunity,
      'totalRating',
    ) || 0;

    return {
      jobsPerPlatform: jobsPerPlatform
        ?.map((cur) => ({ ...cur, count: parseInt(cur?.count) }))
        ?.sort((a, b) => b.count - a.count),
      jobsPerCompany: jobsPerCompany
        ?.map((cur) => ({ ...cur, count: parseInt(cur?.count) }))
        ?.sort((a, b) => b.count - a.count),
      jobsPerRating: jobsPerRating?.map((cur) => ({
        ...cur,
        count: parseInt(cur?.count),
      })),
      jobsPerType: jobsPerType
        ?.map((cur) => ({ ...cur, count: parseInt(cur?.count) }))
        ?.sort((a, b) => b.count - a.count),
      jobsPerHiringRegime: jobsPerHiringRegime
        ?.map((cur) => ({ ...cur, count: parseInt(cur?.count) }))
        ?.sort((a, b) => b.count - a.count),
      totalOfJobs,
      totalOfAppliedJobs,
      totalOfDiscardedJobs,
      totalOfUnwantedJobs,
      totalOfRecusedJobs,
      totalOfRecusedJobsWithoutEnterview,
      medianOfInterviews: sumOfNumberOfInterviews / totalOfAppliedJobs,
      medianOfTests: sumOfNumberOfTests / totalOfAppliedJobs,
      medianOfRatings: sumOfTotalRatings / totalOfJobs,
    };
  }
}
