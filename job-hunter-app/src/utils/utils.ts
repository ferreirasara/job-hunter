import { JobType, JobsTableData, OrderBy, Platform } from "../components/JobsTable";

export const getJobsFromAPI = async (args: {
  page?: number,
  limit?: number,
  platformFilter?: string[],
  appliedFilter?: string[],
  typeFilter?: string[],
  skillsFilter?: string[],
  orderBy?: OrderBy,
  showDiscarded?: boolean
}) => {
  const { limit = 10, page = 0, appliedFilter, orderBy, platformFilter, skillsFilter, typeFilter, showDiscarded } = args;
  const searchParams: any = {};

  if (limit) searchParams.limit = limit?.toString();
  if (page || page === 0) searchParams.page = page?.toString();
  if (platformFilter) searchParams.platformFilter = platformFilter;
  if (appliedFilter) searchParams.appliedFilter = appliedFilter;
  if (skillsFilter) searchParams.skillsFilter = skillsFilter;
  if (typeFilter) searchParams.typeFilter = typeFilter;
  if (showDiscarded) searchParams.showDiscarded = showDiscarded;
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

export const createNewJob = async (body: {
  company: string
  platform: Platform
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
}): Promise<{ success: boolean, message?: string, uuid?: string }> => {
  const newJobResponse = await fetch("http://localhost:8080/job/", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const newJobResponseJson = await newJobResponse?.json();
  return newJobResponseJson;
}

export const formatDateHour = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj?.toLocaleString('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit' });
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