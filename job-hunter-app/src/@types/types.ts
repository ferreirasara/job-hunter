export interface GetJobsFromAPIArgs {
  page: number;
  limit: number;
  platformFilter?: string;
  typeFilter?: string;
  hiringRegimeFilter?: string;
  skillFilter?: string;
  benefitFilter?: string;
  skillsFilter?: string;
  titleFilter?: string;
  companyFilter?: string;
  seniorityFilter?: string;
  orderByOrder?: 'ascend' | 'descend';
  orderByField?: string;
  showOnlyDiscarded?: boolean;
  showOnlyRecused?: boolean;
  showOnlyNewJobs?: boolean;
  showOnlyApplied?: boolean;
};

export interface FiltersState extends GetJobsFromAPIArgs {
  setState: (partialState: Partial<FiltersState>) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export enum JobPlatform {
  GUPY = 'GUPY',
  PROGRAMATHOR = 'PROGRAMATHOR',
  TRAMPOS = 'TRAMPOS',
  VAGAS = 'VAGAS',
  REMOTAR = 'REMOTAR',
  LINKEDIN = 'LINKEDIN',
  JOBATUS = 'JOBATUS',
  DIVULGA_VAGAS = 'DIVULGA_VAGAS',
  COODESH = 'COODESH',
  STARTUP = 'STARTUP',
  SOLIDES = 'SOLIDES',
}

export enum JobType {
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID',
  FACE_TO_FACE = 'FACE_TO_FACE',
}

export enum JobHiringRegime {
  PJ = 'PJ',
  CLT = 'CLT',
}

export enum JobSeniority {
  JUNIOR = 'JUNIOR',
  MID_LEVEL = 'MID_LEVEL',
  SENIOR = 'SENIOR',
}

export interface JobsTableData {
  uuid: string;
  idInPlatform: string;
  company: string;
  platform: JobPlatform;
  title: string;
  description: string;
  url: string;
  country: string;
  state: string;
  city: string;
  applied: boolean;
  discarded: boolean;
  recused: boolean;
  createdAt: Date;
  type: JobType;
  hiringRegime: JobHiringRegime;
  skills: string;
  benefits: string;
  skillsRating: number;
  benefitsRating: number;
  totalRating: number;
  numberOfInterviews: number;
  numberOfTests: number;
  seniority: JobSeniority;
  yearsOfExperience: number;
  regex: string[];
}

export interface JobsResponse {
  message?: string;
  totalOfJobs: number;
  data: JobsTableData[];
  allRatings: number[];
  allSkills: string[];
  allBenefits: string[];
}

export interface ContType {
  name: string;
  cont: number;
};
export interface StatsResponse {
  message ?: string;
  jobsPerPlatform: { platform: string; count: number } [];
  jobsPerCompany: { company: string; count: number } [];
  jobsPerRating: { totalRating: string; count: number } [];
  jobsPerType: { type: string; count: number } [];
  jobsPerHiringRegime: { hiringRegime: string; count: number } [];
  totalOfJobs: number;
  totalOfAppliedJobs: number;
  totalOfDiscardedJobs: number;
  totalOfRecusedJobs: number;
  totalOfRecusedJobsWithoutEnterview: number;
  medianOfInterviews: number;
  medianOfTests: number;
  medianOfRatings: number;
  skillsContType: ContType[];
  benefitsContType: ContType[];
};
