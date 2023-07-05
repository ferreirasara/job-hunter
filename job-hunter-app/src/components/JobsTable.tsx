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

export enum JobPlatform {
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
export enum JobSkill {
  AGILE = "AGILE",
  ANGULAR = "ANGULAR",
  ANTD = "ANTD",
  AJAX = "AJAX",
  API = "API",
  APOLLO = "APOLLO",
  BACHELORS_DEGREE = "BACHELORS_DEGREE",
  BLAZOR = "BLAZOR",
  BOOTSTRAP = "BOOTSTRAP",
  CERTIFICATIONS = "CERTIFICATIONS",
  COBOL = "COBOL",
  CODE_MAINTAINABILITY = "CODE_MAINTAINABILITY",
  CODE_VERSIONING = "CODE_VERSIONING",
  CPLUSPLUS = "CPLUSPLUS",
  CSS = "CSS",
  CSHARP = "CSHARP",
  DART = "DART",
  DB = "DB",
  DELPHI = "DELPHI",
  DESIGN_PATTERNS = "DESIGN_PATTERNS",
  DESIGN_SYSTEM = "DESIGN_SYSTEM",
  DEV_OPS = "DEV_OPS",
  DJANGO = "DJANGO",
  DOT_NET = "DOT_NET",
  DRUPAL = "DRUPAL",
  ECOMMERCE = "ECOMMERCE",
  ENGLISH = "ENGLISH",
  FIGMA = "FIGMA",
  FLUTTER = "FLUTTER",
  FRONTEND_BUILD_TOOLS = "FRONTEND_BUILD_TOOLS",
  FULL_STACK = "FULL_STACK",
  GOOD_PRACTICES = "GOOD_PRACTICES",
  GOLANG = "GOLANG",
  GRAPHQL = "GRAPHQL",
  HTML = "HTML",
  IONIC = "IONIC",
  JAVA = "JAVA",
  JAVASCRIPT = "JAVASCRIPT",
  JQUERY = "JQUERY",
  KOTLIN = "KOTLIN",
  LIGHTHOUSE = "LIGHTHOUSE",
  LINUX = "LINUX",
  LOW_CODE = "LOW_CODE",
  MACHINE_LEARNING = "MACHINE_LEARNING",
  MATERIAL_UI = "MATERIAL_UI",
  MENSAGERIA = "MENSAGERIA",
  MOBILE_DEVELOPMENT = "MOBILE_DEVELOPMENT",
  NEST = "NEST",
  NEXT = "NEXT",
  NUXT = "NUXT",
  NODE = "NODE",
  OBJECTIVE_C = "OBJECTIVE_C",
  PHP = "PHP",
  POWER_BI = "POWER_BI",
  PYTHON = "PYTHON",
  PWA = "PWA",
  REACT = "REACT",
  REACT_HOOKS = "REACT_HOOKS",
  REACT_NATIVE = "REACT_NATIVE",
  REACT_ROUTER = "REACT_ROUTER",
  RESPONSIVE_DESIGN = "RESPONSIVE_DESIGN",
  RUBY = "RUBY",
  RUST = "RUST",
  SASS = "SASS",
  SALESFORCE = "SALESFORCE",
  SCALA = "SCALA",
  SPANISH = "SPANISH",
  STATE_MANAGEMENT = "STATE_MANAGEMENT",
  STORYBOOK = "STORYBOOK",
  STRAPI = "STRAPI",
  STYLED_COMPONENTS = "STYLED_COMPONENTS",
  SWIFT = "SWIFT",
  TAILWIND = "TAILWIND",
  TECH_LEAD = "TECH_LEAD",
  TEST = "TEST",
  TOMCAT = "TOMCAT",
  TYPESCRIPT = "TYPESCRIPT",
  UI = "UI",
  UX = "UX",
  VANILLA = "VANILLA",
  VUE = "VUE",
  WEB_HOOKS = "WEB_HOOKS",
  WORDPRESS = "WORDPRESS",
}
export enum JobBenefit {
  ANUAL_BONUS = "ANUAL_BONUS",
  BIRTHDAY_DAYOFF = "BIRTHDAY_DAYOFF",
  COURSE_HELP = "COURSE_HELP",
  FLEXIBLE_HOURS = "FLEXIBLE_HOURS",
  FOURTEENTH_SALARY = "FOURTEENTH_SALARY",
  GYMPASS = "GYMPASS",
  HEALTH_OR_DENTAL_PLAN = "HEALTH_OR_DENTAL_PLAN",
  HOME_OFFICE_VOUCHER = "HOME_OFFICE_VOUCHER",
  LIFE_INSURANCE = "LIFE_INSURANCE",
  MEAL_VOUCHER = "MEAL_VOUCHER",
  PAID_VACATIONS = "PAID_VACATIONS",
  PLR = "PLR",
  PRIVATE_PENSION = "PRIVATE_PENSION",
  PSYCHOLOGICAL_HELP = "PSYCHOLOGICAL_HELP",
  REFERRAL_BONUS = "REFERRAL_BONUS",
  STOCK_OPTIONS = "STOCK_OPTIONS",
  THIRTEENTH_SALARY = "THIRTEENTH_SALARY",
  TRANSPORTATION_VOUCHER = "TRANSPORTATION_VOUCHER",
  USD_SALARY = "USD_SALARY",
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
}

export type JobsResponse = {
  message?: string
  totalOfJobs: number,
  data: JobsTableData[],
  allRatings: number[],
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
  const { onChangePlatformFilter, onChangeTypeFilter, onChangeHiringRegimeFilter, onChangeSkillFilter, onChangeBenefitFilter } = useContext(FiltersContext);
  const { limit, page, onChangeLimit, onChangePage, onChangeOrderBy } = useContext(PaginationContext);

  const typeOptions = Object.keys(JobType);
  const hiringRegimeOptions = Object.keys(JobHiringRegime);
  const skillOptions = Object.keys(JobSkill);
  const benefitOptions = Object.keys(JobBenefit);
  const platformOptions = Object.keys(JobPlatform);

  const columns: ColumnsType<JobsTableData> = [
    {
      title: "Criada em",
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => formatDateHour(createdAt),
      width: screens?.xl ? 100 : undefined,
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      responsive: ['xl', 'xxl']
    },
    {
      title: "Plataforma",
      dataIndex: 'platform',
      key: 'platform',
      width: screens?.xl ? 130 : undefined,
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
      width: screens?.xl ? 400 : undefined,
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
      width: screens?.xl ? 110 : undefined,
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (type: string) => renderMultipleTags(type),
      responsive: ['xl', 'xxl']
    },
    {
      title: "Contratação",
      dataIndex: 'hiringRegime',
      key: 'hiringRegime',
      filters: hiringRegimeOptions?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
      width: screens?.xl ? 130 : undefined,
      align: 'center',
      sorter: true,
      showSorterTooltip: false,
      render: (type: string) => renderMultipleTags(type),
      responsive: ['xl', 'xxl']
    },
    {
      title: "Skills",
      dataIndex: 'skills',
      key: 'skills',
      ellipsis: true,
      render: (skills: string) => renderMultipleTags(skills),
      filters: skillOptions?.map((cur) => ({ text: cur, value: cur })),
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
      filters: benefitOptions?.map((cur) => ({ text: cur, value: cur })),
      filterSearch: true,
      filterMultiple: false,
      responsive: ['xl', 'xxl']
    },
    {
      title: "Rating",
      dataIndex: 'totalRating',
      key: 'totalRating',
      width: screens?.xl ? 90 : undefined,
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

      onChangePlatformFilter(filters?.platform as string[]);
      onChangeTypeFilter(filters?.type as string[]);
      onChangeHiringRegimeFilter(filters?.hiringRegime as string[]);
      onChangeSkillFilter(filters?.skills as string[]);
      onChangeBenefitFilter(filters?.benefits as string[]);
    }}
  />
}
