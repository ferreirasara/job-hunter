import { BarChartOutlined, ClockCircleOutlined, CloseCircleOutlined, DeleteOutlined, EyeOutlined, ReloadOutlined, StarOutlined } from "@ant-design/icons"
import { Alert, Button, Divider, Input, Space, Tooltip } from "antd"
import { useCallback, useEffect, useState } from "react";
import { JobsResponse, JobsTable, JobsTableData, OrderBy } from "../components/JobsTable";
import { getJobsFromAPI } from "../utils/utils";
import { DetailsDrawer } from "../components/DetailsDrawer";

export const Root = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<JobsTableData[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState<boolean>(false);
  const [showOnlyDiscarded, setShowOnlyDiscarded] = useState<boolean>(false);
  const [showOnlyRecused, setShowOnlyRecused] = useState<boolean>(false);
  const [showOnlyNewJobs, setShowOnlyNewJobs] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const windowHeight = window.innerHeight;
  const tableMaxSixe = windowHeight - 280;
  const maxRows = Math.ceil(tableMaxSixe / 43);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(maxRows);

  const [platformFilter, setPlatformFilter] = useState<string[]>();
  const [typeFilter, setTypeFilter] = useState<string[]>();
  const [hiringRegimeFilter, setHiringRegimeFilter] = useState<string[]>();
  const [skillFilter, setSkillFilter] = useState<string[]>();
  const [benefitFilter, setBenefitFilter] = useState<string[]>();
  const [appliedFilter, setAppliedFilter] = useState<string[]>();
  const [titleFilter, setTitleFilter] = useState<string>();
  const [companyFilter, setCompanyFilter] = useState<string>();

  const [orderBy, setOrderBy] = useState<OrderBy>();

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
        appliedFilter,
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
  }, [appliedFilter, limit, orderBy, page, platformFilter, typeFilter, titleFilter, companyFilter, hiringRegimeFilter, showOnlyDiscarded, showOnlyRecused, showOnlyNewJobs, benefitFilter, skillFilter])

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
      <Space>
        <Button
          block
          icon={<ReloadOutlined />}
          onClick={handleFetchData}
          loading={loading}
        >
          {data?.length ? "Recarregar" : "Carregar"} dados
        </Button>
        <Input.Search
          placeholder="Filtrar por empresa"
          loading={loading}
          onSearch={(value) => setCompanyFilter(value)}
          style={{ width: 200 }}
        />
        <Input.Search
          placeholder="Filtrar por título"
          loading={loading}
          onSearch={(value) => setTitleFilter(value)}
          style={{ width: 200 }}
        />
        <Button
          block
          type={showOnlyDiscarded ? "primary" : "default"}
          icon={showOnlyDiscarded ? <EyeOutlined /> : <DeleteOutlined />}
          onClick={() => setShowOnlyDiscarded(!showOnlyDiscarded)}
          loading={loading}
        >
          {showOnlyDiscarded ? "Não descartadas" : "Descartadas"}
        </Button>
        <Button
          block
          type={showOnlyRecused ? "primary" : "default"}
          icon={showOnlyRecused ? <EyeOutlined /> : <CloseCircleOutlined />}
          onClick={() => setShowOnlyRecused(!showOnlyRecused)}
          loading={loading}
        >
          {showOnlyRecused ? "Não recusadas" : "Recusadas"}
        </Button>
        <Tooltip title={showOnlyNewJobs ? "Exibe todas as vagas" : "Exibe apenas as vagas dos 2 últimos dias"}>
          <Button
            block
            type={showOnlyNewJobs ? "primary" : "default"}
            icon={showOnlyNewJobs ? <ClockCircleOutlined /> : <StarOutlined />}
            onClick={() => setShowOnlyNewJobs(!showOnlyNewJobs)}
            loading={loading}
          >
            {showOnlyNewJobs ? "Todas" : "Novas"}
          </Button>
        </Tooltip>
        <Button
          block
          icon={<BarChartOutlined />}
          href="/stats"
        >
          Ver estatísticas
        </Button>
      </Space>
      {errorMessage ? <Alert
        type="error"
        description={errorMessage}
        showIcon
        message="Error"
      /> : null}
      <JobsTable
        loading={loading}
        data={data}
        totalOfJobs={totalOfJobs}
        allSkills={allSkills}
        allBenefits={allBenefits}
        allRatings={allRatings}
        allPlatforms={allPlatforms}
        page={page}
        onChangePage={(newPage) => setPage(newPage)}
        limit={limit}
        onChangeLimit={(newLimit) => setLimit(newLimit)}
        onChangeOrderBy={({ field, order }) => setOrderBy({ field, order })}
        onChangePlatformFilter={(filter) => setPlatformFilter(filter)}
        onChangeTypeFilter={(filter) => setTypeFilter(filter)}
        onChangeHiringRegimeFilter={(filter) => setHiringRegimeFilter(filter)}
        onChangeSkillFilter={(filter) => setSkillFilter(filter)}
        onChangeBenefitFilter={(filter) => setBenefitFilter(filter)}
        onChangeAppliedFilter={(filter) => setAppliedFilter(filter)}
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