export enum JobSkill {
  AGILE = "AGILE",
  ANGULAR = "ANGULAR",
  ANTD = "ANTD",
  AJAX = "AJAX",
  API = "API",
  APOLLO = "APOLLO",
  BACHELORS_DEGREE = "BACHELORS_DEGREE",
  BOOTSTRAP = "BOOTSTRAP",
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
  MACHINE_LEARNING = "MACHINE_LEARNING",
  MATERIAL_UI = "MATERIAL_UI",
  MENSAGERIA = "MENSAGERIA",
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
  SHOPIFY = "SHOPIFY",
  STATE_MANAGEMENT = "STATE_MANAGEMENT",
  STORYBOOK = "STORYBOOK",
  STYLED_COMPONENTS = "STYLED_COMPONENTS",
  SWIFT = "SWIFT",
  TAILWIND = "TAILWIND",
  TEST = "TEST",
  TYPESCRIPT = "TYPESCRIPT",
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
  GYMPASS = "GYMPASS",
  HEALTH_OR_DENTAL_PLAN = "HEALTH_OR_DENTAL_PLAN",
  HOME_OFFICE_VOUCHER = "HOME_OFFICE_VOUCHER",
  LIFE_INSURANCE = "LIFE_INSURANCE",
  MEAL_VOUCHER = "MEAL_VOUCHER",
  PAID_VACATIONS = "PAID_VACATIONS",
  PRIVATE_PENSION = "PRIVATE_PENSION",
  PSYCHOLOGICAL_HELP = "PSYCHOLOGICAL_HELP",
  REFERRAL_BONUS = "REFERRAL_BONUS",
  STOCK_OPTIONS = "STOCK_OPTIONS",
  TRANSPORTATION_VOUCHER = "TRANSPORTATION_VOUCHER",
  USD_SALARY = "USD_SALARY",
}

export enum JobHiringRegime {
  PJ = "PJ",
  CLT = "CLT",
}

export enum JobType {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FACE_TO_FACE = "FACE_TO_FACE",
}

export enum JobPlatform {
  GUPY = "GUPY",
  PROGRAMATHOR = "PROGRAMATHOR",
  TRAMPOS = "TRAMPOS",
  VAGAS = "VAGAS",
  REMOTAR = "REMOTAR",
  LINKEDIN = "LINKEDIN",
}

export type GupyResponse = {
  data: GupyData[]
}
export type GupyData = {
  id: number,
  companyId: number,
  name: string,
  description: string,
  careerPageId: number,
  careerPageName: string,
  careerPageLogo: string,
  type: string,
  publishedDate: string,
  applicationDeadline: any,
  isRemoteWork: boolean,
  city: string,
  state: string,
  country: string,
  jobUrl: string,
  badges: {
    friendlyBadge: boolean,
  },
  disabilities: boolean,
  careerPageUrl: string,
}

export type JobInitialData = { url: string, idInPlatform: string }

export type JobInput = {
  company: string
  platform: JobPlatform
  title: string
  description: string
  url: string
  country?: string
  state?: string
  city?: string
  idInPlatform?: string
  skills?: string
  benefits?: string
  type?: JobType
  hiringRegime?: JobHiringRegime
  skillsRating?: number
  benefitsRating?: number
  applied?: boolean
  discarded?: boolean
}

export type OrderBy = { field: string, order: "ascend" | "descend" }

export type UpdateJobBody = {
  applied?: boolean
  discarded?: boolean
  recused?: boolean
  numberOfInterviews?: number
  numberOfTests?: number
}