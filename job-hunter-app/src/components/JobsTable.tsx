import { Button, Grid, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table";
import { formatDateHour } from "../utils/utils";
import { ZoomInOutlined } from "@ant-design/icons";
import { renderMultipleTags } from "./renderMultipleTags";
import { renderRating } from "./renderRating";
import { useContext } from "react";
import { PaginationContext } from "../context/PaginationContext";

export enum JobPlatform {
  GUPY = "GUPY",
  PROGRAMATHOR = "PROGRAMATHOR",
  TRAMPOS = "TRAMPOS",
  VAGAS = "VAGAS",
  REMOTAR = "REMOTAR",
  LINKEDIN = "LINKEDIN",
  JOBATUS = "JOBATUS",
  DIVULGA_VAGAS = "DIVULGA_VAGAS",
  COODESH = "COODESH",
}
export enum JobType {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FACE_TO_FACE = "FACE_TO_FACE",
}
export enum JobHiringRegime {
  PJ = "PJ",
  CLT = "CLT",
}
export enum JobSeniority {
  JUNIOR = "JUNIOR",
  MID_LEVEL = "MID_LEVEL",
  SENIOR = "SENIOR",
}

export type JobsTableData = {
  uuid: string
  idInPlatform: string
  company: string
  platform: JobPlatform
  title: string
  description: string
  url: string
  country: string
  state: string
  city: string
  applied: boolean
  discarded: boolean
  recused: boolean
  createdAt: Date
  type: JobType
  hiringRegime: JobHiringRegime
  skills: string
  benefits: string
  skillsRating: number
  benefitsRating: number
  totalRating: number
  numberOfInterviews: number
  numberOfTests: number
  seniority: JobSeniority
  yearsOfExperience: number
  regex: string[]
}

export type JobsResponse = {
  message?: string
  totalOfJobs: number,
  data: JobsTableData[],
  allRatings: number[],
  allSkills: string[],
  allBenefits: string[],
}

export type OrderBy = { field: string, order: "ascend" | "descend" }

type JobsTableProps = {
  loading: boolean
  data: JobsTableData[]
  totalOfJobs?: number
  allRatings: number[]
  handleSeeDetails: (uuid: string) => void
}

export const JobsTable = ({
  loading,
  data,
  totalOfJobs,
  allRatings,
  handleSeeDetails,
}: JobsTableProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { limit, page, onChangeLimit, onChangePage } = useContext(PaginationContext);

  const columns: ColumnsType<JobsTableData> = [
    {
      title: "Criada em",
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => formatDateHour(createdAt),
      width: screens?.xl ? 98 : undefined,
      align: 'center',
      showSorterTooltip: false,
      responsive: ['xl', 'xxl']
    },
    {
      title: "Plataforma",
      dataIndex: 'platform',
      key: 'platform',
      width: screens?.xl ? 125 : undefined,
      ellipsis: true,
      showSorterTooltip: false,
      align: 'center',
      responsive: ['xl', 'xxl']
    },
    {
      title: "Empresa",
      dataIndex: 'company',
      key: 'company',
      width: screens?.xl ? 170 : undefined,
      ellipsis: true,
      showSorterTooltip: false,
      responsive: ['xl', 'xxl']
    },
    {
      title: "Título",
      dataIndex: 'title',
      key: 'title',
      width: screens?.xxl ? 400 : undefined,
      ellipsis: true,
      showSorterTooltip: false,
      render: (title, record) => record.url ? <Typography.Link
        href={record.url}
        target="_blank"
      >
        {title}
      </Typography.Link> : <Typography.Text>{title}</Typography.Text>
    },
    {
      title: "Tipo",
      dataIndex: 'type',
      key: 'type',
      width: screens?.xxl ? 110 : undefined,
      align: 'center',
      showSorterTooltip: false,
      render: (type: string) => renderMultipleTags(type),
      responsive: ['xxl']
    },
    {
      title: "Contratação",
      dataIndex: 'hiringRegime',
      key: 'hiringRegime',
      width: screens?.xxl ? 130 : undefined,
      align: 'center',
      showSorterTooltip: false,
      render: (type: string) => renderMultipleTags(type),
      responsive: ['xxl']
    },
    {
      title: "Senioridade",
      dataIndex: 'seniority',
      key: 'seniority',
      width: screens?.xxl ? 130 : undefined,
      align: 'center',
      showSorterTooltip: false,
      render: (type: string) => renderMultipleTags(type),
      responsive: ['xxl']
    },
    {
      title: "Experiência",
      dataIndex: 'yearsOfExperience',
      key: 'yearsOfExperience',
      width: screens?.xxl ? 105 : undefined,
      align: 'center',
      showSorterTooltip: false,
      responsive: ['xxl']
    },
    {
      title: "Skills",
      dataIndex: 'skills',
      key: 'skills',
      ellipsis: true,
      render: (skills: string) => renderMultipleTags(skills),
      responsive: ['xl', 'xxl']
    },
    {
      title: "Benefícios",
      dataIndex: 'benefits',
      key: 'benefits',
      ellipsis: true,
      render: (benefits: string) => renderMultipleTags(benefits),
      responsive: ['xl', 'xxl']
    },
    {
      title: "Rating",
      dataIndex: 'totalRating',
      key: 'totalRating',
      width: screens?.xl ? 75 : undefined,
      align: 'center',
      render: (rating) => renderRating(rating, allRatings?.indexOf(rating), allRatings?.length),
      showSorterTooltip: false,
      responsive: ['xl', 'xxl']
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

  return <Table
    bordered
    loading={loading}
    columns={columns}
    dataSource={data}
    rowKey={'uuid'}
    size="small"
    pagination={{
      position: ["bottomCenter"],
      onChange: (page, pageSize) => {
        onChangePage(page - 1);
        onChangeLimit(pageSize);
      },
      total: totalOfJobs || 0,
      current: page + 1,
      pageSize: limit,
    }}
  />
}
