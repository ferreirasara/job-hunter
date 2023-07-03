import { Tag } from "antd"

export const renderMultipleTags = (field?: string) => {
  if (!field || field === "") return null;
  return field?.split(',')?.filter(cur => !!cur?.trim())?.map(cur => <Tag
    color={getTagColor(cur?.trim())}
    style={{ margin: 2 }}
    key={cur?.trim()}
  >
    {cur?.trim()}
  </Tag>)
}

const SKILL_RATING = {
  "AGILE": 1,
  "ANGULAR": -1,
  "ANTD": 1,
  "AJAX": -1,
  "API": 0,
  "APOLLO": 1,
  "BACHELORS_DEGREE": 1,
  "BLAZOR": -1,
  "BOOTSTRAP": 1,
  "CERTIFICATIONS": -1,
  "COBOL": -1,
  "CODE_MAINTAINABILITY": 1,
  "CODE_VERSIONING": 1,
  "C": -1,
  "CLEAN_CODE": 1,
  "CPLUSPLUS": -1,
  "CSHARP": -1,
  "CSS": 1,
  "DART": -1,
  "DB": 0,
  "DELPHI": -1,
  "DESIGN_PATTERNS": 1,
  "DESIGN_SYSTEM": 1,
  "DEV_OPS": -1,
  "DJANGO": 0,
  "DOT_NET": -1,
  "DRUPAL": -1,
  "ECOMMERCE": 0,
  "ENGLISH": 0,
  "FIGMA": 1,
  "FLUTTER": -1,
  "FRONTEND_BUILD_TOOLS": 1,
  "FULL_STACK": 0,
  "GOOD_PRACTICES": 1,
  "GOLANG": -1,
  "GRAPHQL": 1,
  "HTML": 1,
  "IONIC": -1,
  "JAVA": -1,
  "JAVASCRIPT": 1,
  "JQUERY": -1,
  "KOTLIN": -1,
  "LIGHTHOUSE": 1,
  "LINUX": 0,
  "LOW_CODE": -1,
  "MACHINE_LEARNING": -1,
  "MATERIAL_UI": 1,
  "MENSAGERIA": -1,
  "MOBILE_DEVELOPMENT": -1,
  "NEST": 0,
  "NEXT": 1,
  "NUXT": -1,
  "NODE": 1,
  "OBJECTIVE_C": -1,
  "PHP": -1,
  "POWER_BI": -1,
  "PYTHON": 0,
  "PWA": 0,
  "REACT": 1,
  "REACT_HOOKS": 1,
  "REACT_NATIVE": -1,
  "REACT_ROUTER": 1,
  "RESPONSIVE_DESIGN": 1,
  "RUBY": -1,
  "RUST": -1,
  "SASS": 1,
  "SALESFORCE": -1,
  "SCALA": -1,
  "SPANISH": -1,
  "STATE_MANAGEMENT": 1,
  "STORYBOOK": 1,
  "STRAPI": -1,
  "STYLED_COMPONENTS": 1,
  "SWIFT": -1,
  "TAILWIND": 0,
  "TECH_LEAD": -1,
  "TEST": 1,
  "TOMCAT": -1,
  "TYPESCRIPT": 1,
  "UI": 1,
  "UX": 1,
  "VANILLA": -1,
  "VUE": -1,
  "WEB_HOOKS": 1,
  "WORDPRESS": -1,
}

export const BENEFITS_RATING = {
  "ANUAL_BONUS": 1,
  "BIRTHDAY_DAYOFF": 1,
  "COURSE_HELP": 1,
  "FLEXIBLE_HOURS": 2,
  "FOURTEENTH_SALARY": 1,
  "GYMPASS": 2,
  "HEALTH_OR_DENTAL_PLAN": 2,
  "HOME_OFFICE_VOUCHER": 2,
  "LIFE_INSURANCE": 1,
  "MEAL_VOUCHER": 1,
  "PAID_VACATIONS": 1,
  "PLR": 1,
  "PRIVATE_PENSION": 1,
  "PSYCHOLOGICAL_HELP": 1,
  "REFERRAL_BONUS": 1,
  "STOCK_OPTIONS": 1,
  "THIRTEENTH_SALARY": 1,
  "TRANSPORTATION_VOUCHER": 1,
  "USD_SALARY": 1,
}

const getTagColor = (tag: string) => {
  // @ts-ignore
  const skillRating = SKILL_RATING?.[tag];
  // @ts-ignore
  const benefitRating = BENEFITS_RATING?.[tag];

  if (skillRating !== undefined) {
    if (skillRating === -1) return "red";
    if (skillRating === 0) return "orange";
    if (skillRating === 1) return "green";
  }

  if (benefitRating !== undefined) {
    if (benefitRating === 1) return "blue";
    if (benefitRating === 2) return "purple";
  }

  if (tag === "CLT") return "green";
  if (tag === "PJ") return "red";

  if (tag === "REMOTE") return "green";
  if (tag === "HYBRID") return "red";
  if (tag === "FACE_TO_FACE") return "red";

  return "default";
}
