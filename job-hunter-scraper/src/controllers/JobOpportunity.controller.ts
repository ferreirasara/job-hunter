import { AppDataSource } from "../data-source";
import { JobOpportunity } from "../entity/JobOpportunity"

type JobPlatform = "GUPY" | "PROGRAMATHOR"

type JobInput = {
  company: string,
  platform: JobPlatform,
  title: string,
  description: string
  url: string
  country?: string
  state?: string
  city?: string
  idInPlatform?: string
  skills?: string
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

  public static async getAllJobsFromPlatform(platform: JobPlatform) {
    const jobs = await AppDataSource.manager.find(JobOpportunity, { where: { platform: platform } });
    return jobs;
  }
}