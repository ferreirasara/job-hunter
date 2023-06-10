import { BarChartOutlined, ClockCircleOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, ReloadOutlined, StarOutlined } from "@ant-design/icons"
import { Alert, Button, Divider, Space, Tooltip } from "antd"
import { useCallback, useEffect, useState } from "react";
import { CreateJobModal } from "../components/CreateJobModal";
import { JobsResponse, JobsTable, JobsTableData, OrderBy } from "../components/JobsTable";
import { getJobsFromAPI } from "../utils/utils";
import { DetailsDrawer } from "../components/DetailsDrawer";

export const Root = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<JobsTableData[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [showOnlyDiscarded, setShowOnlyDiscarded] = useState<boolean>(false);
  const [showOnlyNewJobs, setShowOnlyNewJobs] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(18);

  const [platformFilter, setPlatformFilter] = useState<string[]>();
  const [typeFilter, setTypeFilter] = useState<string[]>();
  const [hiringRegimeFilter, setHiringRegimeFilter] = useState<string[]>();
  const [skillFilter, setSkillFilter] = useState<string[]>();
  const [benefitFilter, setBenefitFilter] = useState<string[]>();
  const [appliedFilter, setAppliedFilter] = useState<string[]>();

  const [orderBy, setOrderBy] = useState<OrderBy>();

  const [totalOfJobs, setTotalOfJobs] = useState<number>(0);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [allBenefits, setAllBenefits] = useState<string[]>([]);

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
        orderBy,
        showOnlyDiscarded,
        showOnlyNewJobs,
      });
      if (response) {
        setErrorMessage("");
        setTotalOfJobs(response?.totalOfJobs);
        setAllSkills(response?.allSkills);
        setAllBenefits(response?.allBenefits);
        setData(response?.data);
      }
    } catch (e) {
      handleError(e?.toString() || "");
    }
    setLoading(false);
  }, [appliedFilter, limit, orderBy, page, platformFilter, typeFilter, hiringRegimeFilter, showOnlyDiscarded, showOnlyNewJobs])

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const handleSeeDetails = (uuid: string) => {
    const job = data?.find(cur => cur?.uuid === uuid)
    setSelectedJob(job);
    setDetailsModalOpen(true);
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
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
        <Button
          block
          type={showOnlyDiscarded ? "primary" : "default"}
          icon={showOnlyDiscarded ? <EyeOutlined /> : <DeleteOutlined />}
          onClick={() => setShowOnlyDiscarded(!showOnlyDiscarded)}
          loading={loading}
        >
          Mostrar apenas vagas {showOnlyDiscarded ? "não descartadas" : "descartadas"}
        </Button>
        <Tooltip title={showOnlyNewJobs ? "Exibe todas as vagas" : "Exibe apenas as vagas dos 2 últimos dias"}>
          <Button
            block
            type={showOnlyNewJobs ? "primary" : "default"}
            icon={showOnlyNewJobs ? <ClockCircleOutlined /> : <StarOutlined />}
            onClick={() => setShowOnlyNewJobs(!showOnlyNewJobs)}
            loading={loading}
          >
            Mostrar {showOnlyNewJobs ? "todas as vagas" : "apenas vagas novas"}
          </Button>
        </Tooltip>
        <Button
          block
          icon={<PlusOutlined />}
          onClick={() => setCreateModalOpen(true)}
          loading={loading}
        >
          Adicionar vaga
        </Button>
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
    <CreateJobModal
      open={createModalOpen}
      onCancel={() => setCreateModalOpen(false)}
      fetchData={handleFetchData}
    />
    <DetailsDrawer
      open={detailsModalOpen}
      onCancel={handleCloseDetailsModal}
      selectedJob={selectedJob}
      fetchData={handleFetchData}
    />
  </div>
}