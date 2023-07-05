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

  const secretToken = localStorage?.getItem('secret_token');
  const jobsResponse = await fetch(encodeURI(`${process.env.REACT_APP_API_BASE_URL}/jobs?${qs.toString()}`), { headers: { "Authorization": secretToken || "" } });
  const jobsResponseJson: JobsResponse = await jobsResponse?.json();
  return jobsResponseJson;
}

export const setJobAsApplied = async (uuid: string) => {
  const secretToken = localStorage?.getItem('secret_token');
  const body = { applied: true }
  const jobAppliedResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/job/` + uuid, {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Authorization": secretToken || "" },
    body: JSON.stringify(body),
  });
  const jobAppliedResponseJson = await jobAppliedResponse?.json();
  return jobAppliedResponseJson;
}

export const setJobAsDiscarded = async (uuid: string) => {
  const secretToken = localStorage?.getItem('secret_token');
  const body = { discarded: true }
  const jobDiscardedResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/job/` + uuid, {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Authorization": secretToken || "" },
    body: JSON.stringify(body),
  });
  const jobDiscardedResponseJson = await jobDiscardedResponse?.json();
  return jobDiscardedResponseJson;
}

export const setJobAsRecused = async (uuid: string) => {
  const secretToken = localStorage?.getItem('secret_token');
  const body = { recused: true }
  const jobRecusedResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/job/` + uuid, {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Authorization": secretToken || "" },
    body: JSON.stringify(body),
  });
  const jobRecusedResponseJson = await jobRecusedResponse?.json();
  return jobRecusedResponseJson;
}

export const updateNumberOfInterviews = async (uuid: string, numberOfInterviews: number) => {
  const secretToken = localStorage?.getItem('secret_token');
  const body = { numberOfInterviews }
  const jobRecusedResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/job/` + uuid, {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Authorization": secretToken || "" },
    body: JSON.stringify(body),
  });
  const jobRecusedResponseJson = await jobRecusedResponse?.json();
  return jobRecusedResponseJson;
}

export const updateNumberOfTests = async (uuid: string, numberOfTests: number) => {
  const secretToken = localStorage?.getItem('secret_token');
  const body = { numberOfTests }
  const jobRecusedResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/job/` + uuid, {
    method: 'POST',
    headers: { "Content-Type": "application/json", "Authorization": secretToken || "" },
    body: JSON.stringify(body),
  });
  const jobRecusedResponseJson = await jobRecusedResponse?.json();
  return jobRecusedResponseJson;
}

export const getStatsFromAPI = async () => {
  const secretToken = localStorage?.getItem('secret_token');
  const statsResponse = await fetch(encodeURI(`${process.env.REACT_APP_API_BASE_URL}/stats`), { headers: { "Content-Type": "application/json", "Authorization": secretToken || "" } });
  const statsResponseJson = await statsResponse?.json();
  return statsResponseJson;
}

export const formatDateHour = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj?.toLocaleString('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export const validateSecretToken = async (token: string) => {
  const validadeTokenResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/validate`, {
    method: 'POST',
    headers: { "Authorization": token },
  });
  const validadeTokenResponseJson = await validadeTokenResponse?.json();
  return validadeTokenResponseJson;
}