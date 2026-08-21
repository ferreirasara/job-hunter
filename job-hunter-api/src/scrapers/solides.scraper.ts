import { JobInput, JobPlatform, SolidesJob, SolidesResponse } from '../@types/types';
import { analyzeDescription } from '../analyzer/analyzer';
import JobOpportunityController from '../controllers/JobOpportunity.controller';
import { removeHtmlTags, slugify } from '../utils/utils';
import ScraperInterface from './scraperInterface';

const platform: JobPlatform = JobPlatform.SOLIDES;

export default class SolidesScraper extends ScraperInterface {
  constructor({
    filterExistentsJobs = true,
  }: {
    filterExistentsJobs?: boolean;
  }) {
    super({ platform, filterExistentsJobs });
  }

  public async getJobs(): Promise<JobInput[]> {
    this.log('Start');

    const existentJobs = await JobOpportunityController.getAllJobsFromPlatform(
      this.platform,
    );
    const existentJobsIds = existentJobs?.map((cur) => cur?.idInPlatform);

    const allJobs = await this.getDetails();
    this.log(`Scraped jobs: ${allJobs?.length}`);
    const jobs = allJobs.filter((cur) => !existentJobsIds?.includes(cur.idInPlatform));
    this.log(`Filtered jobs: ${jobs?.length}`);

    this.log('End');
    return jobs;
  }

  private convertJob(solidesJob: SolidesJob): JobInput {
    const description = `Área de ocupação: ${solidesJob?.occupationAreas?.map((cur) => cur.name).join(', ')}\n\nSkills: ${solidesJob?.hardSkills?.map((cur) => cur.name).join(', ')}\n\nEducação: ${solidesJob?.education?.map((cur) => cur.name).join(', ')}\n\Idiomas: ${solidesJob?.language?.map((cur) => cur.name).join(', ')}\n\Senioridade: ${solidesJob?.seniority?.map((cur) => cur.name).join(', ')}\n\Tipo de recrutamento: ${solidesJob?.recruitmentContractType?.map((cur) => cur.name).join(', ')}\n\nBenefícios: ${solidesJob?.benefits?.map((cur) => cur.name).join(', ')}\n\nDescrição: ${removeHtmlTags(solidesJob?.description)}`;
    const analyzerResponse = analyzeDescription({
      title: solidesJob?.title,
      description,
    });

    return {
      title: solidesJob?.title,
      company: solidesJob?.companyName,
      city: solidesJob?.city?.name,
      state: solidesJob?.state?.name,
      description: analyzerResponse?.description,
      url: `https://vagas.solides.com.br/vaga/${solidesJob?.id}/${slugify(solidesJob?.title)}`,
      idInPlatform: String(solidesJob?.id),
      type: analyzerResponse?.type,
      platform: this.platform,
      skills: analyzerResponse?.skills?.join(','),
      benefits: analyzerResponse?.benefits?.join(','),
      benefitsRating: analyzerResponse?.benefitsRating,
      skillsRating: analyzerResponse?.skillsRating,
      hiringRegime: analyzerResponse?.hiringRegime,
      seniority: analyzerResponse?.seniority,
    }
  }

  private async getDetails(): Promise<JobInput[]> {
    const jobs: JobInput[] = [];

    let totalPages = 100;
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      try {
        const response = await fetch(
          `https://apigw.solides.com.br/jobs/v3/portal-vacancies-new?jobsType=remoto&page=${pageNumber}&title=frontend&take=10`,
        );
        const responseJson: SolidesResponse = await response?.json();
        totalPages = responseJson?.data?.totalPages || 1;

        responseJson?.data?.data?.forEach(data => {
          if (!jobs.some((cur) => cur.idInPlatform === String(data.id))) {
            jobs?.push(this.convertJob(data));
          }
        });
      } catch (e) {
        this.log(e, { error: true });
        continue;
      }
    }

    totalPages = 100;
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      try {
        const response = await fetch(
          `https://apigw.solides.com.br/jobs/v3/portal-vacancies-new?jobsType=remoto&page=${pageNumber}&title=react&take=10`,
        );
        const responseJson: SolidesResponse = await response?.json();
        totalPages = responseJson?.data?.totalPages || 1;

        responseJson?.data?.data?.forEach(data => {
          if (!jobs.some((cur) => cur.idInPlatform === String(data.id))) {
            jobs?.push(this.convertJob(data));
          }
        });
      } catch (e) {
        this.log(e, { error: true });
        continue;
      }
    }

    totalPages = 100;
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      try {
        const response = await fetch(
          `https://apigw.solides.com.br/jobs/v3/portal-vacancies-new?jobsType=remoto&page=${pageNumber}&title=desenvolvedor&take=10`,
        );
        const responseJson: SolidesResponse = await response?.json();
        totalPages = responseJson?.data?.totalPages || 1;

        responseJson?.data?.data?.forEach(data => {
          if (!jobs.some((cur) => cur.idInPlatform === String(data.id))) {
            jobs?.push(this.convertJob(data));
          }
        });
      } catch (e) {
        this.log(e, { error: true });
        continue;
      }
    }

    totalPages = 100;
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      try {
        const response = await fetch(
          `https://apigw.solides.com.br/jobs/v3/portal-vacancies-new?jobsType=remoto&page=${pageNumber}&title=developer&take=10`,
        );
        const responseJson: SolidesResponse = await response?.json();
        totalPages = responseJson?.data?.totalPages || 1;

        responseJson?.data?.data?.forEach(data => {
          if (!jobs.some((cur) => cur.idInPlatform === String(data.id))) {
            jobs?.push(this.convertJob(data));
          }
        });
      } catch (e) {
        this.log(e, { error: true });
        continue;
      }
    }

    return jobs;
  }
}
