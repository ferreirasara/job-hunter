import { Alert, Button, Divider, Space } from "antd"
import { useCallback, useContext, useEffect, useState } from "react";
import { JobsResponse, JobsTable, JobsTableData } from "../components/JobsTable";
import { GetJobsFromAPIArgs, getJobsFromAPI } from "../utils/utils";
import { DetailsDrawer } from "../components/DetailsDrawer";
import { NavLink, Navigate } from "react-router-dom";
import { BarChartOutlined, FilterOutlined } from "@ant-design/icons";
import { FiltersDrawer } from "../components/FiltersDrawer";

export default function Root() {
  const [apiArgs, setApiArgs] = useState<GetJobsFromAPIArgs>({
    showOnlyApplied: false, showOnlyDiscarded: false, showOnlyNewJobs: false,
    showOnlyRecused: false, orderBy: { field: "createdAt", order: "descend" }
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<JobsTableData[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState<boolean>(false);
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [totalOfJobs, setTotalOfJobs] = useState<number>(0);
  const [allRatings, setAllRatings] = useState<number[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [allBenefits, setAllBenefits] = useState<string[]>([]);

  const handleFetchData = useCallback(async (apiArgs: GetJobsFromAPIArgs) => {
    setLoading(true);
    try {
      const response: JobsResponse = await getJobsFromAPI({ ...apiArgs });
      if (response?.message) {
        setErrorMessage(response?.message);
      } else {
        setErrorMessage("");
        setTotalOfJobs(response?.totalOfJobs);
        setAllRatings(response?.allRatings);
        setAllSkills(response?.allSkills);
        setAllBenefits(response?.allBenefits);
        setData(response?.data);
      }
    } catch (e) {
      setErrorMessage(e?.toString() || "");
    }
    setLoading(false);
  }, [])

  useEffect(() => {
    handleFetchData({});
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
    <Space direction="vertical" style={{ padding: '0 16px' }}>
      <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
        Job Hunter
      </Divider>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', flexWrap: 'wrap' }}>
        <Button icon={<FilterOutlined />} onClick={() => setFiltersDrawerOpen(true)}>
          Filtrar vagas
        </Button>
        <NavLink to="/stats">
          <Button icon={<BarChartOutlined />}>
            Ver estatísticas
          </Button>
        </NavLink>
      </div>
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
      fetchData={(value: GetJobsFromAPIArgs) => handleFetchData(value)}
      apiArgs={apiArgs}
    />
    <FiltersDrawer
      open={filtersDrawerOpen}
      onClose={() => setFiltersDrawerOpen(false)}
      fetchData={(value: GetJobsFromAPIArgs) => handleFetchData(value)}
      allSkills={allSkills}
      allBenefits={allBenefits}
      loading={loading}
      apiArgs={apiArgs}
      onChangeApiArgs={(value: GetJobsFromAPIArgs) => setApiArgs(value)}
    />
  </div>
}