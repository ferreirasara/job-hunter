import { Alert, Divider, Space } from "antd"
import { useCallback, useEffect, useState } from "react";
import { JobsResponse, JobsTable, JobsTableData } from "../components/JobsTable";
import { getJobsFromAPI } from "../utils/utils";
import { DetailsDrawer } from "../components/DetailsDrawer";
import { FilterButtons } from "../components/FilterButtons";
import { useFilterStateValues } from "../state/filter.state";
import { useShowOnlyStateValues } from "../state/showOnly.state";
import { useDataStateValues } from "../state/data.state";
import { usePaginationStateValues } from "../state/pagination.state";

export const Root = () => {
  const { companyFilter, titleFilter, platformFilter, appliedFilter, benefitFilter, hiringRegimeFilter, skillFilter, typeFilter } = useFilterStateValues();
  const { showOnlyDiscarded, showOnlyNewJobs, showOnlyRecused } = useShowOnlyStateValues();
  const { data, setData, setLoading, setAllBenefits, setAllPlatforms, setAllRatings, setAllSkills, setTotalOfJobs } = useDataStateValues();
  const { limit, orderBy, page } = usePaginationStateValues();

  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleError = (message: string) => setErrorMessage(message);

  const getJobsFromAPIArgs = {
    limit, page, orderBy,
    platformFilter, appliedFilter, typeFilter, hiringRegimeFilter, skillFilter, benefitFilter, titleFilter, companyFilter,
    showOnlyDiscarded, showOnlyRecused, showOnlyNewJobs,
  }
  const handleFetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: JobsResponse = await getJobsFromAPI(getJobsFromAPIArgs);
      if (response) {
        setErrorMessage("");
        setTotalOfJobs(response?.totalOfJobs);
        setAllSkills(response?.allSkills);
        setAllBenefits(response?.allBenefits);
        setAllPlatforms(response?.allPlatforms);
        setAllRatings(response?.allRatings);
        setData(response?.data);
      }
    } catch (e) {
      handleError(e?.toString() || "");
    }
    setLoading(false);
  }, [
    limit, page, orderBy,
    platformFilter, appliedFilter, typeFilter, hiringRegimeFilter, skillFilter, benefitFilter, titleFilter, companyFilter,
    showOnlyDiscarded, showOnlyRecused, showOnlyNewJobs,
  ])

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const handleSeeDetails = (uuid: string) => {
    const job = data?.find(cur => cur?.uuid === uuid)
    setSelectedJob(job);
    setDetailsDrawerOpen(true);
  }

  const onCloseDrawer = () => {
    setDetailsDrawerOpen(false);
    setSelectedJob(undefined);
  }

  return <div>
    <Space direction="vertical" style={{ padding: '0 64px' }}>
      <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
        Job Hunter
      </Divider>
      <FilterButtons handleFetchData={handleFetchData} />
      {errorMessage ? <Alert type="error" description={errorMessage} showIcon message="Error" /> : null}
      <JobsTable handleSeeDetails={(uuid) => handleSeeDetails(uuid)} />
    </Space>
    <DetailsDrawer
      open={detailsDrawerOpen}
      onClose={onCloseDrawer}
      selectedJob={selectedJob}
      fetchData={handleFetchData}
    />
  </div>
}