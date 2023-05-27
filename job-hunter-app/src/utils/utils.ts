import { JobsTableData } from "../components/JobsTable";

export const getJobsFromAPI = async (args: {
  page?: number,
  limit?: number,
  companyFilter?: string,
  cityilter?: string,
  platformFilter?: string,
  descriptionFilter?: string,
  countryFilter?: string,
  stateFilter?: string,
  cityFilter?: string,
  appliedFilter?: string,
  orderBy?: string,
}) => {
  const { limit, page, appliedFilter, cityFilter, cityilter, companyFilter, countryFilter, descriptionFilter, orderBy, platformFilter, stateFilter } = args;
  const jobsResponse = await fetch(encodeURI(`http://localhost:8080/jobs?limit=${limit}&page=${page}`));
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