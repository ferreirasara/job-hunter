import { Alert, Button, Divider, Space, Table } from "antd"
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { formatDateHour, getJobsFromAPI, isNewJob } from "../utils/utils";
import { DetailsModal } from "./DetailsModal";
import { CheckSquareTwoTone, CloseSquareTwoTone, ZoomInOutlined } from "@ant-design/icons";
import "../style/JobsTable.css"
import { Link } from "./Link";

export type JobsTableData = {
  uuid: string
  idInPlatform: string
  company: string
  platform: string
  title: string
  description: string
  url: string
  country: string
  state: string
  city: string
  applied: boolean
  discarded: boolean
  createdAt: Date
}

export const JobsTable = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<JobsTableData[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [companyFilter, setCompanyFilter] = useState<string>("");
  const [cityilter, setCityilter] = useState<string>("");
  const [platformFilter, setPlatformFilter] = useState<string>("");
  const [descriptionFilter, setDescriptionFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [appliedFilter, setAppliedFilter] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [totalOfJobs, setTotalOfJobs] = useState<number>(0);

  const handleError = (message: string) => setErrorMessage(message);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: { totalOfJobs: number, data: JobsTableData[] } = await getJobsFromAPI({
        limit,
        page,
        companyFilter,
        cityilter,
        platformFilter,
        descriptionFilter,
        countryFilter,
        stateFilter,
        cityFilter,
        appliedFilter,
        orderBy,
      });
      if (response) {
        setTotalOfJobs(response?.totalOfJobs);
        setData(response?.data?.filter(cur => !cur?.discarded))
      }
    } catch (e) {
      handleError(e?.toString() || "");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData()
  }, [limit, page]);

  const handleSeeDetails = (uuid: string) => {
    const job = data?.find(cur => cur?.uuid === uuid)
    setSelectedJob(job);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(undefined);
  }

  const columns: ColumnsType<JobsTableData> = [
    {
      title: "Criada em",
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => formatDateHour(createdAt),
      width: 100,
      align: 'center',
    },
    { title: "Plataforma", dataIndex: 'platform', key: 'platform', width: 100, },
    { title: "Empresa", dataIndex: 'company', key: 'company', width: 200, ellipsis: true, },
    { title: "Título", dataIndex: 'title', key: 'title', ellipsis: true, },
    { title: "Descrição", dataIndex: 'description', key: 'description', ellipsis: true, },
    {
      title: "URL",
      dataIndex: 'url',
      key: 'url',
      width: 72,
      align: 'center',
      ellipsis: true,
      render: (url) => <Link url={url} />,
    },
    {
      title: "Aplicada?",
      dataIndex: 'applied',
      key: 'applied',
      width: 100,
      align: 'center',
      render: (applied) => applied ? <CheckSquareTwoTone twoToneColor="#52c41a" /> : <CloseSquareTwoTone twoToneColor="#eb2f96" />,
    },
    { title: "País", dataIndex: 'country', key: 'country', width: 100, ellipsis: true, },
    { title: "Estado", dataIndex: 'state', key: 'state', width: 100, ellipsis: true, },
    { title: "Cidade", dataIndex: 'city', key: 'city', width: 100, ellipsis: true, },
    {
      title: "",
      dataIndex: 'uuid',
      key: 'uuid',
      width: 56,
      align: 'center',
      render: (uuid) => <Button size="small" onClick={() => handleSeeDetails(uuid)} icon={<ZoomInOutlined />} />
    },
  ]

  return <Space direction="vertical">
    <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
      Job Hunter
    </Divider>
    {errorMessage ? <Alert type="error" description={errorMessage} /> : null}
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey={'uuid'}
      rowClassName={(record) => isNewJob(record) ? 'new-job' : ''}
      size="small"
      pagination={{
        onChange: (page, pageSize) => {
          setPage(page - 1);
          setLimit(pageSize);
        },
        total: totalOfJobs || 0,
        current: page + 1,
        pageSize: limit,
      }}
    // onChange={ }
    />
    <DetailsModal
      open={modalOpen}
      onCancel={handleCloseModal}
      selectedJob={selectedJob}
      fetchData={fetchData}
    />
  </Space>
}