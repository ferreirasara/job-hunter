import { Alert, Button, Divider, Space, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { formatDateHour, getJobsFromAPI } from "../utils/utils";
import { DetailsModal } from "./DetailsModal";
import { CheckSquareTwoTone, CloseSquareTwoTone, PlusOutlined, ZoomInOutlined } from "@ant-design/icons";
import "../style/JobsTable.css"
import castArray from 'lodash/castArray';
import { renderMultipleTags } from "./renderMultipleTags";
import { CreateJobModal } from "./CreateJobModal";

export enum Platform {
  GUPY = "GUPY",
  PROGRAMATHOR = "PROGRAMATHOR",
  TRAMPOS = "TRAMPOS",
  VAGAS = "VAGAS",
  REMOTAR = "REMOTAR",
}
export enum JobType {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FACE_TO_FACE = "FACE_TO_FACE",
}

export type JobsTableData = {
  uuid: string
  idInPlatform: string
  company: string
  platform: Platform
  title: string
  description: string
  url: string
  country: string
  state: string
  city: string
  applied: boolean
  discarded: boolean
  createdAt: Date
  type: JobType
  salaryRange: string
  skills: string
  benefits: string
  skillsRating: number
  benefitsRating: number
  totalRating: number
}

export type JobsResponse = {
  totalOfJobs: number,
  data: JobsTableData[],
}

export type OrderBy = { field: string, order: "ascend" | "descend" }

export const JobsTable = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<JobsTableData[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobsTableData>();
  const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(18);

  const [platformFilter, setPlatformFilter] = useState<string[]>();
  const [typeFilter, setTypeFilter] = useState<string[]>();
  const [appliedFilter, setAppliedFilter] = useState<string[]>();

  const [orderBy, setOrderBy] = useState<OrderBy>();

  const [totalOfJobs, setTotalOfJobs] = useState<number>(0);

  const handleError = (message: string) => setErrorMessage(message);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response: JobsResponse = await getJobsFromAPI({
        limit,
        page,
        platformFilter,
        appliedFilter,
        typeFilter,
        orderBy,
      });
      if (response) {
        setTotalOfJobs(response?.totalOfJobs);
        setData(response?.data);
      }
    } catch (e) {
      handleError(e?.toString() || "");
    }
    setLoading(false);

  }, [appliedFilter, limit, orderBy, page, platformFilter, typeFilter])

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const handleSeeDetails = (uuid: string) => {
    const job = data?.find(cur => cur?.uuid === uuid)
    setSelectedJob(job);
    setDetailsModalOpen(true);
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedJob(undefined);
  }


  const platformOptions = Object.keys(Platform);
  const typeOptions = Object.keys(JobType);
  const columns: ColumnsType<JobsTableData> = [
    {
      title: "Criada em",
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => formatDateHour(createdAt),
      width: 100,
      align: 'center',
      sorter: () => 0,
    },
    {
      title: "Plataforma",
      dataIndex: 'platform',
      key: 'platform',
      width: 130,
      sorter: () => 0,
      filters: platformOptions.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
    },
    {
      title: "Empresa",
      dataIndex: 'company',
      key: 'company',
      width: 200,
      ellipsis: true,
      sorter: () => 0,
    },
    {
      title: "Título",
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      sorter: () => 0,
      render: (title, record) => <Typography.Link
        href={record.url}
        target="_blank"
      >
        {title}
      </Typography.Link>
    },
    {
      title: "Tipo",
      dataIndex: 'type',
      key: 'type',
      filters: typeOptions?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
      width: 110,
      sorter: () => 0,
    },
    {
      title: "Faixa salarial",
      dataIndex: 'salaryRange',
      key: 'salaryRange',
      width: 150,
      sorter: () => 0,
    },
    {
      title: "Skills",
      dataIndex: 'skills',
      key: 'skills',
      ellipsis: true,
      render: (skills: string) => renderMultipleTags(skills),
    },
    {
      title: "Benefícios",
      dataIndex: 'benefits',
      key: 'benefits',
      ellipsis: true,
      render: (benefits: string) => renderMultipleTags(benefits),
    },
    {
      title: "Rating Skills",
      dataIndex: 'skillsRating',
      key: 'skillsRating',
      sorter: () => 0,
    },
    {
      title: "Rating Benefícios",
      dataIndex: 'benefitsRating',
      key: 'benefitsRating',
      sorter: () => 0,
    },
    {
      title: "Rating Total",
      dataIndex: 'totalRating',
      key: 'totalRating',
      sorter: () => 0,
    },
    {
      title: "Aplicada?",
      dataIndex: 'applied',
      key: 'applied',
      width: 110,
      align: 'center',
      render: (applied) => applied ? <CheckSquareTwoTone twoToneColor="#52c41a" /> : <CloseSquareTwoTone twoToneColor="#eb2f96" />,
      filters: [{ text: "Sim", value: true }, { text: "Não", value: false }],
      filterSearch: true,
      sorter: (a, b) => 0,
    },
    {
      title: "",
      dataIndex: 'uuid',
      key: 'uuid',
      width: 56,
      align: 'center',
      render: (uuid) => <Button size="small" onClick={() => handleSeeDetails(uuid)} icon={<ZoomInOutlined />} />
    },
  ]

  return <div>
    <Space direction="vertical" style={{ margin: '0 64px' }}>
      <Divider style={{ fontSize: '24px', fontWeight: '600' }}>
        Job Hunter
      </Divider>
      <Button
        icon={<PlusOutlined />}
        onClick={() => setCreateModalOpen(true)}
      >
        Adicionar Job
      </Button>
      {/* <Space style={{ width: '100%' }}>
      <Input
        disabled={loading}
        addonAfter={<Button
          type="text"
          size="small"
          icon={<SearchOutlined />}
          loading={loading}
          onClick={handleTextSearch}
        >
          Pesquisar
        </Button>}
        onChange={(e) => setInputValue(e?.target?.value)}
        placeholder="Pesquisar por empresa, título ou descrição"
      />
    </Space> */}
      {errorMessage ? <Alert type="error" description={errorMessage} /> : null}
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey={'uuid'}
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
        onChange={(pagination, filters, sorter) => {
          const sorter2 = sorter && castArray(sorter)[0];
          if (sorter) setOrderBy({ field: sorter2?.field as string, order: sorter2?.order as "descend" | "ascend" })

          setPlatformFilter(filters?.platform as string[]);
          setAppliedFilter(filters?.applied as string[]);
          setTypeFilter(filters?.type as string[]);
        }}
      />
    </Space>
    <DetailsModal
      open={detailsModalOpen}
      onCancel={handleCloseDetailsModal}
      selectedJob={selectedJob}
      fetchData={fetchData}
    />
    <CreateJobModal
      open={createModalOpen}
      onCancel={() => setCreateModalOpen(false)}
      fetchData={fetchData}
    />
  </div>
}
