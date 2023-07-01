import { Alert, Divider, Space } from "antd"
import { useCallback, useContext, useEffect, useState } from "react";
import { JobsResponse, JobsTable, JobsTableData } from "../components/JobsTable";
import { getJobsFromAPI } from "../utils/utils";
import { DetailsDrawer } from "../components/DetailsDrawer";
import { FilterButtons } from "../components/FilterButtons";
import { FiltersContext } from "../context/FiltersContext";
import { ShowOnlyContext } from "../context/ShowOnlyContext";
import { PaginationContext } from "../context/PaginationContext";

export const Root = () => {
  const { platformFilter, typeFilter, hiringRegimeFilter, skillFilter, benefitFilter, titleFilter, companyFilter } = useContext(FiltersContext);
  const { showOnlyApplied, showOnlyDiscarded, showOnlyNewJobs, showOnlyRecused } = useContext(ShowOnlyContext);
  const { page, limit, orderBy } = useContext(PaginationContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<JobsTableData[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [totalOfJobs, setTotalOfJobs] = useState<number>(0);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [allBenefits, setAllBenefits] = useState<string[]>([]);
  const [allPlatforms, setAllPlatforms] = useState<string[]>([]);
  const [allRatings, setAllRatings] = useState<number[]>([]);

  const handleError = (message: string) => setErrorMessage(message);

  const handleFetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: JobsResponse = await getJobsFromAPI({
        limit,
        page,
        platformFilter,
        typeFilter,
        hiringRegimeFilter,
        skillFilter,
        benefitFilter,
        titleFilter,
        companyFilter,
        orderBy,
        showOnlyDiscarded,
        showOnlyRecused,
        showOnlyNewJobs,
        showOnlyApplied,
      });
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
  }, [limit, orderBy, page, platformFilter, typeFilter, titleFilter, companyFilter, hiringRegimeFilter, showOnlyDiscarded, showOnlyRecused, showOnlyNewJobs, showOnlyApplied, benefitFilter, skillFilter])

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
      <FilterButtons
        handleFetchData={handleFetchData}
        loading={loading}
        dataLength={data?.length}
      />
      {errorMessage ? <Alert type="error" description={errorMessage} showIcon message="Error" /> : null}
      <JobsTable
        loading={loading}
        data={data}
        totalOfJobs={totalOfJobs}
        allSkills={allSkills}
        allBenefits={allBenefits}
        allRatings={allRatings}
        allPlatforms={allPlatforms}
        handleSeeDetails={(uuid) => handleSeeDetails(uuid)}
      />
    </Space>
    <DetailsDrawer
      open={detailsDrawerOpen}
      onClose={onCloseDrawer}
      selectedJob={selectedJob}
      fetchData={handleFetchData}
    />
  </div>
}