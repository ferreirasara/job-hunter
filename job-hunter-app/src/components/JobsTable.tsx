import { Alert, Button, Checkbox, Divider, Space, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { formatDateHour, getJobsFromAPI, isNewJob } from "../utils/utils";
import { DetailsModal } from "./DetailsModal";
import { DeleteOutlined, LinkOutlined, ZoomInOutlined } from "@ant-design/icons";
import "../style/JobsTable.css"

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

  const handleError = (message: string) => setErrorMessage(message);

  useEffect(() => {
    setLoading(true);
    getJobsFromAPI()
      .then(result => {
        setData(result?.filter((cur: JobsTableData) => !cur?.discarded));
        setLoading(false);
      })
      .catch(e => {
        handleError(e?.toString());
      })
  }, []);

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
      render: (url) => <Typography.Link href={url} target="_blank"><LinkOutlined /></Typography.Link>,
    },
    {
      title: "Aplicada?",
      dataIndex: 'applied',
      key: 'applied',
      width: 100,
      align: 'center',
      render: (applied) => <Checkbox disabled={!!applied} checked={!!applied} />,
    },
    { title: "País", dataIndex: 'country', key: 'country', width: 100, ellipsis: true, },
    { title: "Estado", dataIndex: 'state', key: 'state', width: 100, ellipsis: true, },
    { title: "Cidade", dataIndex: 'city', key: 'city', width: 100, ellipsis: true, },
    {
      title: "Ações",
      dataIndex: 'uuid',
      key: 'uuid',
      width: 88,
      align: 'center',
      render: (uuid) => <Space>
        <Button size="small" onClick={() => handleSeeDetails(uuid)} icon={<ZoomInOutlined />} />
        <Button size="small" icon={<DeleteOutlined />} />
      </Space>
    },
  ]

  return <div>
    <Divider>Vagas</Divider>
    {errorMessage ? <Alert type="error" description={errorMessage} /> : null}
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      rowKey={'uuid'}
      rowClassName={(record) => isNewJob(record) ? 'new-job' : ''}
      size="small"
    />
    <DetailsModal
      open={modalOpen}
      onCancel={handleCloseModal}
      selectedJob={selectedJob}
    />
  </div>
}