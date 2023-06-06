import { BarChartOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons"
import { Alert, Button, Divider, Space } from "antd"
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
  const [showDiscarded, setShowDiscarded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(18);

  const [platformFilter, setPlatformFilter] = useState<string[]>();
  const [typeFilter, setTypeFilter] = useState<string[]>();
  const [appliedFilter, setAppliedFilter] = useState<string[]>();

  const [orderBy, setOrderBy] = useState<OrderBy>();

  const [totalOfJobs, setTotalOfJobs] = useState<number>(0);

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
        orderBy,
        showDiscarded,
      });
      if (response) {
        setTotalOfJobs(response?.totalOfJobs);
        setData(response?.data);
      }
    } catch (e) {
      handleError(e?.toString() || "");
    }
    setLoading(false);
  }, [appliedFilter, limit, orderBy, page, platformFilter, typeFilter, showDiscarded])

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
        <Button icon={<ReloadOutlined />} onClick={handleFetchData} loading={loading}>
          {data?.length ? "Recarregar" : "Carregar"} dados
        </Button>
        <Button
          icon={showDiscarded ? <EyeOutlined /> : <DeleteOutlined />}
          onClick={() => setShowDiscarded(!showDiscarded)}
          loading={loading}
        >
          Mostrar apenas vagas {showDiscarded ? "não descartadas" : "descartadas"}
        </Button>
        <Button icon={<PlusOutlined />} onClick={() => setCreateModalOpen(true)} loading={loading}>
          Adicionar vaga
        </Button>
        <Button icon={<BarChartOutlined />} href="/stats">
          Ver estatísticas
        </Button>
      </Space>
      {errorMessage ? <Alert type="error" description={errorMessage} /> : null}
      <JobsTable
        loading={loading}
        data={data}
        totalOfJobs={totalOfJobs}
        page={page}
        onChangePage={(newPage) => setPage(newPage)}
        limit={limit}
        onChangeLimit={(newLimit) => setLimit(newLimit)}
        onChangeOrderBy={({ field, order }) => setOrderBy({ field, order })}
        onChangePlatformFilter={(filter) => setPlatformFilter(filter)}
        onChangeTypeFilter={(filter) => setTypeFilter(filter)}
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