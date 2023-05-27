import { JobsTableData, OrderBy } from "../components/JobsTable";

export const getJobsFromAPI = async (args: {
  page?: number,
  limit?: number,
  platformFilter?: string[],
  countryFilter?: string[],
  stateFilter?: string[],
  cityFilter?: string[],
  appliedFilter?: string[],
  orderBy?: OrderBy,
}) => {
  const { limit = 10, page = 0, appliedFilter, cityFilter, countryFilter, orderBy, platformFilter, stateFilter } = args;
  const searchParams: any = {};

  if (limit) searchParams.limit = limit?.toString();
  if (page || page === 0) searchParams.page = page?.toString();
  if (appliedFilter) searchParams.appliedFilter = appliedFilter;
  if (cityFilter) searchParams.cityFilter = cityFilter;
  if (countryFilter) searchParams.countryFilter = countryFilter;
  if (platformFilter) searchParams.platformFilter = platformFilter;
  if (stateFilter) searchParams.stateFilter = stateFilter;
  if (appliedFilter) searchParams.appliedFilter = appliedFilter;
  if (appliedFilter) searchParams.appliedFilter = appliedFilter;
  if (orderBy?.field && orderBy?.order) {
    searchParams.orderByField = orderBy?.field;
    searchParams.orderByOrder = orderBy?.order;
  }

  const qs = new URLSearchParams(searchParams);

  const jobsResponse = await fetch(encodeURI(`http://localhost:8080/jobs?${qs.toString()}`));
  const jobsResponseJson = await jobsResponse?.json();
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

export const formatDateHour = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj?.toLocaleDateString('pt-br')
}

export const isNewJob = (job: JobsTableData): boolean => {
  const now = new Date();
  const jobDate = new Date(job.createdAt);

  if (
    jobDate.getDate() === now.getDate() &&
    jobDate.getMonth() === now.getMonth() &&
    jobDate.getFullYear() === now.getFullYear() &&
    !job?.applied
  ) {
    return true;
  } else {
    return false;
  }
}

export const isUpperCase = (str: string): boolean => {
  return str === str?.toUpperCase();
}