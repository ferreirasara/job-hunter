import { Button, Table, Typography } from "antd"
import { ColumnsType } from "antd/es/table";
import { formatDateHour } from "../utils/utils";
import { CheckSquareTwoTone, CloseSquareTwoTone, ZoomInOutlined } from "@ant-design/icons";
import "../style/JobsTable.css"
import castArray from 'lodash/castArray';
import { renderMultipleTags } from "./renderMultipleTags";
import { renderRating } from "./renderRating";
import { useFilterStateValues } from "../state/filter.state";
import { useDataStateValues } from "../state/data.state";
import { usePaginationStateValues } from "../state/pagination.state";

export enum Platform {
  GUPY = "GUPY",
  PROGRAMATHOR = "PROGRAMATHOR",
  TRAMPOS = "TRAMPOS",
  VAGAS = "VAGAS",
  REMOTAR = "REMOTAR",
  LINKEDIN = "LINKEDIN",
}
export enum JobType {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FACE_TO_FACE = "FACE_TO_FACE",
}
enum JobHiringRegime {
  PJ = "PJ",
  CLT = "CLT",
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
}

export type JobsResponse = {
  totalOfJobs: number,
  data: JobsTableData[],
  allSkills: string[],
  allBenefits: string[],
  allRatings: number[],
  allPlatforms: string[],
}

export type OrderBy = { field: string, order: "ascend" | "descend" }

type JobsTableProps = { handleSeeDetails: (uuid: string) => void }
export const JobsTable = ({ handleSeeDetails }: JobsTableProps) => {
  const { setPlatformFilter, setAppliedFilter, setTypeFilter, setHiringRegimeFilter, setSkillFilter, setBenefitFilter } = useFilterStateValues();
  const { data, loading, allBenefits, allPlatforms, allRatings, allSkills, totalOfJobs } = useDataStateValues();
  const { limit, page, setLimit, setOrderBy, setPage } = usePaginationStateValues();

  const onChangePage = (newPage: number) => setPage(newPage)
  const onChangeLimit = (newLimit: number) => setLimit(newLimit)
  const onChangeOrderBy = (orderBy: OrderBy) => setOrderBy(orderBy)

  const typeOptions = Object.keys(JobType);
  const hiringRegimeOptions = Object.keys(JobHiringRegime);
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
      align: 'center',
      filters: allPlatforms.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
    },
    {
      title: "Empresa",
      dataIndex: 'company',
      key: 'company',
      width: 170,
      ellipsis: true,
      sorter: () => 0,
    },
    {
      title: "Título",
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      sorter: () => 0,
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
      width: 110,
      align: 'center',
      sorter: () => 0,
      render: (type: string) => renderMultipleTags(type),
    },
    {
      title: "Contratação",
      dataIndex: 'hiringRegime',
      key: 'hiringRegime',
      filters: hiringRegimeOptions?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
      width: 130,
      align: 'center',
      sorter: () => 0,
      render: (type: string) => renderMultipleTags(type),
    },
    {
      title: "Skills",
      dataIndex: 'skills',
      key: 'skills',
      ellipsis: true,
      render: (skills: string) => renderMultipleTags(skills),
      filters: allSkills?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
    },
    {
      title: "Benefícios",
      dataIndex: 'benefits',
      key: 'benefits',
      ellipsis: true,
      render: (benefits: string) => renderMultipleTags(benefits),
      filters: allBenefits?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
    },
    {
      title: "Rating",
      dataIndex: 'totalRating',
      key: 'totalRating',
      width: 90,
      align: 'center',
      render: (rating) => renderRating(rating, allRatings?.indexOf(rating), allRatings?.length),
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
      sorter: () => 0,
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
      onChange: (page, pageSize) => {
        onChangePage(page - 1);
        onChangeLimit(pageSize);
      },
      total: totalOfJobs || 0,
      current: page + 1,
      pageSize: limit,
    }}
    onChange={(_, filters, sorter) => {
      const sorter2 = sorter && castArray(sorter)[0];
      if (sorter) onChangeOrderBy({ field: sorter2?.field as string, order: sorter2?.order as "descend" | "ascend" })

      setPlatformFilter(filters?.platform as string[]);
      setAppliedFilter(filters?.applied as string[]);
      setTypeFilter(filters?.type as string[]);
      setHiringRegimeFilter(filters?.hiringRegime as string[]);
      setSkillFilter(filters?.skills as string[]);
      setBenefitFilter(filters?.benefits as string[]);
    }}
  />
}
