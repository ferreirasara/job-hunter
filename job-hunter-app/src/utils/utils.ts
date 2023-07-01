import { JobsResponse, OrderBy } from "../components/JobsTable";

export const getJobsFromAPI = async (args: {
  page?: number,
  limit?: number,
  platformFilter?: string[],
  typeFilter?: string[],
  hiringRegimeFilter?: string[],
  skillFilter?: string[],
  benefitFilter?: string[],
  skillsFilter?: string[],
  titleFilter?: string,
  companyFilter?: string,
  orderBy?: OrderBy,
  showOnlyDiscarded?: boolean
  showOnlyRecused?: boolean
  showOnlyNewJobs?: boolean
  showOnlyApplied?: boolean
}) => {
  const { limit = 10, page = 0, orderBy, platformFilter, skillsFilter, typeFilter, companyFilter, hiringRegimeFilter, skillFilter, benefitFilter, titleFilter, showOnlyDiscarded, showOnlyRecused, showOnlyNewJobs, showOnlyApplied } = args;
  const searchParams: any = {};

  if (limit) searchParams.limit = limit?.toString();
  if (page || page === 0) searchParams.page = page?.toString();
  if (platformFilter) searchParams.platformFilter = platformFilter;
  if (skillsFilter) searchParams.skillsFilter = skillsFilter;
  if (typeFilter) searchParams.typeFilter = typeFilter;
  if (hiringRegimeFilter) searchParams.hiringRegimeFilter = hiringRegimeFilter;
  if (skillFilter) searchParams.skillFilter = skillFilter;
  if (benefitFilter) searchParams.benefitFilter = benefitFilter;
  if (titleFilter) searchParams.titleFilter = titleFilter;
  if (companyFilter) searchParams.companyFilter = companyFilter;
  if (showOnlyDiscarded) searchParams.showOnlyDiscarded = showOnlyDiscarded;
  if (showOnlyRecused) searchParams.showOnlyRecused = showOnlyRecused;
  if (showOnlyNewJobs) searchParams.showOnlyNewJobs = showOnlyNewJobs;
  if (showOnlyApplied) searchParams.showOnlyApplied = showOnlyApplied;
  if (orderBy?.field && orderBy?.order) {
    searchParams.orderByField = orderBy?.field;
    searchParams.orderByOrder = orderBy?.order;
  }

  const qs = new URLSearchParams(searchParams);

  const jobsResponse = await fetch(encodeURI(`http://localhost:8080/jobs?${qs.toString()}`));
  const jobsResponseJson: JobsResponse = await jobsResponse?.json();
  return jobsResponseJson;
}

export const setJobAsApplied = async (uuid: string) => {
  const body = { applied: true }
  const jobAppliedResponse = await fetch("http://localhost:8080/job/" + uuid, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const jobAppliedResponseJson = await jobAppliedResponse?.json();
  return jobAppliedResponseJson;
}

export const setJobAsDiscarded = async (uuid: string) => {
  const body = { discarded: true }
  const jobDiscardedResponse = await fetch("http://localhost:8080/job/" + uuid, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const jobDiscardedResponseJson = await jobDiscardedResponse?.json();
  return jobDiscardedResponseJson;
}

export const setJobAsRecused = async (uuid: string) => {
  const body = { recused: true }
  const jobRecusedResponse = await fetch("http://localhost:8080/job/" + uuid, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const jobRecusedResponseJson = await jobRecusedResponse?.json();
  return jobRecusedResponseJson;
}

export const updateNumberOfInterviews = async (uuid: string, numberOfInterviews: number) => {
  const body = { numberOfInterviews }
  const jobRecusedResponse = await fetch("http://localhost:8080/job/" + uuid, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const jobRecusedResponseJson = await jobRecusedResponse?.json();
  return jobRecusedResponseJson;
}

export const updateNumberOfTests = async (uuid: string, numberOfTests: number) => {
  const body = { numberOfTests }
  const jobRecusedResponse = await fetch("http://localhost:8080/job/" + uuid, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const jobRecusedResponseJson = await jobRecusedResponse?.json();
  return jobRecusedResponseJson;
}

export const getStatsFromAPI = async () => {
  const statsResponse = await fetch(encodeURI(`http://localhost:8080/stats`));
  const statsResponseJson = await statsResponse?.json();
  return statsResponseJson;
}

export const formatDateHour = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj?.toLocaleString('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit' });
}