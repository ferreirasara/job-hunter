import { Alert, Divider, Space } from "antd"
import { useCallback, useContext, useEffect, useState } from "react";
import { JobsResponse, JobsTable, JobsTableData } from "../components/JobsTable";
import { getJobsFromAPI } from "../utils/utils";
import { DetailsDrawer } from "../components/DetailsDrawer";
import { FilterButtons } from "../components/FilterButtons";
import { FiltersContext } from "../context/FiltersContext";
import { ShowOnlyContext } from "../context/ShowOnlyContext";
import { PaginationContext } from "../context/PaginationContext";
import { Navigate } from "react-router-dom";

export default function Root() {
  const { platformFilter, typeFilter, hiringRegimeFilter, skillFilter, benefitFilter, titleFilter, companyFilter } = useContext(FiltersContext);
  const { showOnlyApplied, showOnlyDiscarded, showOnlyNewJobs, showOnlyRecused } = useContext(ShowOnlyContext);
  const { page, limit, orderBy } = useContext(PaginationContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<JobsTableData[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [totalOfJobs, setTotalOfJobs] = useState<number>(0);
  const [allRatings, setAllRatings] = useState<number[]>([]);

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
      if (response?.message) {
        setErrorMessage(response?.message);
      } else {
        setErrorMessage("");
        setTotalOfJobs(response?.totalOfJobs);
        setAllRatings(response?.allRatings);
        setData(response?.data);
      }
    } catch (e) {
      setErrorMessage(e?.toString() || "");
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

  const secretToken = localStorage?.getItem('secret_token');
  if (!secretToken) return <Navigate to="/login" replace={true} />

  return <div>
    <Space direction="vertical" style={{ padding: '0 32px' }}>
      <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
        Job Hunter
      </Divider>
      <FilterButtons
        handleFetchData={handleFetchData}
        loading={loading}
        dataLength={data?.length}
      />
      {errorMessage ? <Alert type="error" showIcon message={errorMessage} /> : null}
      <JobsTable
        loading={loading}
        data={data}
        totalOfJobs={totalOfJobs}
        allRatings={allRatings}
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