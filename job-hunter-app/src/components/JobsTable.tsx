import { Button, Grid, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table";
import { formatDateHour } from "../utils/utils";
import { ZoomInOutlined } from "@ant-design/icons";
import castArray from 'lodash/castArray';
import { renderMultipleTags } from "./renderMultipleTags";
import { renderRating } from "./renderRating";
import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";
import { PaginationContext } from "../context/PaginationContext";

enum JobPlatform {
  GUPY = "GUPY",
  PROGRAMATHOR = "PROGRAMATHOR",
  TRAMPOS = "TRAMPOS",
  VAGAS = "VAGAS",
  REMOTAR = "REMOTAR",
  LINKEDIN = "LINKEDIN",
  JOBATUS = "JOBATUS",
  DIVULGA_VAGAS = "DIVULGA_VAGAS",
}
enum JobType {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FACE_TO_FACE = "FACE_TO_FACE",
}
enum JobHiringRegime {
  PJ = "PJ",
  CLT = "CLT",
}
enum JobSeniority {
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
  allSkills: string[]
  allBenefits: string[]
}

export const JobsTable = ({
  loading,
  data,
  totalOfJobs,
  allRatings,
  handleSeeDetails,
  allSkills,
  allBenefits,
}: JobsTableProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { onChangePlatformFilter, onChangeTypeFilter, onChangeHiringRegimeFilter, onChangeSkillFilter, onChangeBenefitFilter, onChangeSeniorityFilter } = useContext(FiltersContext);
  const { limit, page, onChangeLimit, onChangePage, onChangeOrderBy } = useContext(PaginationContext);

  const typeOptions = Object.keys(JobType);
  const hiringRegimeOptions = Object.keys(JobHiringRegime);
  const seniorityOptions = Object.keys(JobSeniority);
  const platformOptions = Object.keys(JobPlatform);

  const columns: ColumnsType<JobsTableData> = [
    {
      title: "Criada em",
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => formatDateHour(createdAt),
      width: screens?.xl ? 98 : undefined,
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      responsive: ['xl', 'xxl']
    },
    {
      title: "Plataforma",
      dataIndex: 'platform',
      key: 'platform',
      width: screens?.xl ? 125 : undefined,
      ellipsis: true,
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
      filters: platformOptions.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
      filterMultiple: false,
      responsive: ['xl', 'xxl']
    },
    {
      title: "Empresa",
      dataIndex: 'company',
      key: 'company',
      width: screens?.xl ? 170 : undefined,
      ellipsis: true,
      sorter: true,
      showSorterTooltip: false,
      responsive: ['xl', 'xxl']
    },
    {
      title: "Título",
      dataIndex: 'title',
      key: 'title',
      width: screens?.xxl ? 400 : undefined,
      ellipsis: true,
      sorter: true,
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
      filters: typeOptions?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
      filterMultiple: false,
      width: screens?.xxl ? 110 : undefined,
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (type: string) => renderMultipleTags(type),
      responsive: ['xxl']
    },
    {
      title: "Contratação",
      dataIndex: 'hiringRegime',
      key: 'hiringRegime',
      filters: hiringRegimeOptions?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
      filterMultiple: false,
      width: screens?.xxl ? 130 : undefined,
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (type: string) => renderMultipleTags(type),
      responsive: ['xxl']
    },
    {
      title: "Senioridade",
      dataIndex: 'seniority',
      key: 'seniority',
      filters: seniorityOptions?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
      filterMultiple: false,
      width: screens?.xxl ? 130 : undefined,
      align: 'center',
      sorter: true,
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
      sorter: true,
      showSorterTooltip: false,
      responsive: ['xxl']
    },
    {
      title: "Skills",
      dataIndex: 'skills',
      key: 'skills',
      ellipsis: true,
      render: (skills: string) => renderMultipleTags(skills),
      filters: allSkills?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
      filterMultiple: false,
      responsive: ['xl', 'xxl']
    },
    {
      title: "Benefícios",
      dataIndex: 'benefits',
      key: 'benefits',
      ellipsis: true,
      render: (benefits: string) => renderMultipleTags(benefits),
      filters: allBenefits?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
      filterMultiple: false,
      responsive: ['xl', 'xxl']
    },
    {
      title: "Rating",
      dataIndex: 'totalRating',
      key: 'totalRating',
      width: screens?.xl ? 75 : undefined,
      align: 'center',
      render: (rating) => renderRating(rating, allRatings?.indexOf(rating), allRatings?.length),
      sorter: true,
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
    onChange={(pagination, filters, sorter) => {
      const sorter2 = sorter && castArray(sorter)[0];
      if (sorter) onChangeOrderBy({ field: sorter2?.field as string, order: sorter2?.order as "descend" | "ascend" })

      onChangePlatformFilter(filters?.platform as unknown as string);
      onChangeTypeFilter(filters?.type as unknown as string);
      onChangeHiringRegimeFilter(filters?.hiringRegime as unknown as string);
      onChangeSkillFilter(filters?.skills as unknown as string);
      onChangeBenefitFilter(filters?.benefits as unknown as string);
      onChangeBenefitFilter(filters?.benefits as unknown as string);
      onChangeSeniorityFilter(filters?.seniority as unknown as string);
    }}
  />
}
