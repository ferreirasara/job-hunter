import { JobsTableData } from "../components/JobsTable";

export const getJobsFromAPI = async () => {
  const jobsResponse = await fetch("http://localhost:8080/jobs");
  const jobsResponseJson = await jobsResponse?.json();
  return jobsResponseJson;
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