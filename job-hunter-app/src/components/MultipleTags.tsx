import { Tag } from 'antd';
import { memo } from 'react';
import { getBenefitRating, getSkillRating, getTagColor } from '../utils/utils';

interface MultipleTagsProps {
  field?: string;
}

interface TagValue {
  value: string;
  color: string;
  skillRating?: number;
  benefitRating?: number;
}

const MultipleTags = ({ field }: MultipleTagsProps) => {
  if (!field || field === '') return null;
  const values: TagValue[] = field.split(',').map(value => {
    const skillRating = getSkillRating(value);
    const benefitRating = getBenefitRating(value);
    const color = getTagColor(value, skillRating, benefitRating);

    return { value, color, skillRating, benefitRating };
  })?.sort((a, b) => a.skillRating !== undefined && b.skillRating !== undefined ? a.skillRating - b.skillRating : 0 || a.value.localeCompare(b.value));

  return (
    <>
      {values?.map((cur) => (
        <Tag
          color={cur.color}
          style={{ margin: 2 }}
          key={cur?.value}
        >
          {cur?.value}
        </Tag>
      ))}
    </>
  );
};

export const SKILL_RATING = {
  AG_GRID: 4,
  AGILE: 4,
  AI_AGENTS: 3,
  ANGULAR: -4,
  ANTD: 2,
  AJAX: -2,
  API: 4,
  APOLLO: 4,
  ARTIFICIAL_INTELLIGENCE: 2,
  AUTHENTICATION: 3,
  BACHELORS_DEGREE: 5,
  BACKBONE: -4,
  BLAZOR: -5,
  BLUEPRINTJS: 2,
  BOOTSTRAP: 2,
  C: -4,
  CERTIFICATIONS: -2,
  CHARTS: 2,
  COBOL: -5,
  CODE_MAINTAINABILITY: 5,
  CODE_REVIEW: 4,
  CODE_VERSIONING: 4,
  CPLUSPLUS: -4,
  CLEAN_CODE: 5,
  CSS: 4,
  CYBER_SECURITY: -5,
  CSHARP: -4,
  DART: -4,
  DB: 4,
  DELPHI: -5,
  DESIGN: 3,
  DESIGN_SYSTEM: 4,
  DEV_OPS: 3,
  DJANGO: -3,
  DOT_NET: -4,
  DRUPAL: -5,
  ECOMMERCE: 4,
  ELASTIC_SEARCH: -1,
  ELECTRON: -4,
  ELIXIR: -4,
  EMBER: -4,
  ENGLISH: 4,
  FLASK: -4,
  FLUTTER: -4,
  FRONTEND_BUILD_TOOLS: 4,
  FULL_STACK: 4,
  GAME_ENGINE: -5,
  GATSBY: -1,
  GOOD_PRACTICES: 5,
  GOLANG: -4,
  GRAPHQL: 4,
  HTML: 4,
  INTEGRATIONS: 4,
  IONIC: -4,
  JAVA: -4,
  JAVASCRIPT: 4,
  JQUERY: -3,
  KOTLIN: -4,
  LIGHTHOUSE: 4,
  LINUX: 1,
  LOW_CODE: -5,
  LEAN: 2,
  MACHINE_LEARNING: -2,
  MAGENTO: -4,
  MARKETING: -4,
  MATERIAL_UI: 4,
  MENSAGERIA: 3,
  MICRO_FRONTENDS: 2,
  MICRO_SERVICES: -1,
  MOBILE_DEVELOPMENT: -3,
  NEST: 4,
  NEXT: 4,
  NETWORK: -3,
  NUXT: 4,
  NODE: 4,
  OBJECTIVE_C: -5,
  ORM: 4,
  PACKAGE_MANAGER: 3,
  PAYMENT_INTEGRATIONS: -4,
  PENTEST: -5,
  PERFORMANCE_OPTIMIZATION: 5,
  PERL: -5,
  PHONEGAP: -5,
  PHP: -4,
  POSTMAN: 3,
  POWER_BI: -4,
  PRISMA: 4,
  PRODUCT_MANAGER: -3,
  PROGRAMMING_LOGIC: 5,
  PROTOTYPING: 3,
  PYTHON: -3,
  PWA: 3,
  RAZOR: -5,
  REACT: 5,
  REACT_HOOKS: 5,
  REACT_NATIVE: -2,
  REACT_ROUTER: 4,
  REASONML: -2,
  RESPONSIVE_DESIGN: 5,
  RUBY: -4,
  RUST: -4,
  SALESFORCE: -4,
  SAP: -5,
  SASS: 3,
  SAS: -3,
  SCALA: -4,
  SCRIPT: 3,
  SITE_RENDERING: 4,
  SPA: 5,
  SPANISH: -4,
  STATE_MANAGEMENT: 4,
  STORYBOOK: 3,
  STRAPI: -2,
  STYLED_COMPONENTS: 4,
  SWAGGER: 3,
  SWIFT: -4,
  TAILWIND: 3,
  TECH_LEAD: 5,
  TELECOMMUNICATIONS: -3,
  TEST: 5,
  TOMCAT: 2,
  TOTVS: -5,
  TYPESCRIPT: 5,
  UI: 4,
  UTILITY_LIBRARY: 4,
  UX: 5,
  VANILLA: 4,
  VITE: 4,
  VUE: 4,
  WEB_HOOKS: 3,
  WEBRTC: -2,
  WINDOWS_FORMS: -5,
  WORDPRESS: -4,
};

export const BENEFITS_RATING = {
  ANUAL_BONUS: 1,
  ASSISTANCE: 1,
  BIRTHDAY_DAYOFF: 1,
  COURSE_HELP: 1,
  CHRISTMAS_BASKET: 1,
  FLEXIBLE_HOURS: 2,
  FOURTEENTH_SALARY: 1,
  GYMPASS: 2,
  HEALTH_OR_DENTAL_PLAN: 2,
  HOME_OFFICE_VOUCHER: 2,
  LIFE_INSURANCE: 1,
  MATERNITY_LEAVE: 1,
  MEAL_VOUCHER: 1,
  NOTEBOOK: 1,
  PAID_VACATIONS: 1,
  PET_HELP: 1,
  PHARMACY_AGREEMENT: 1,
  PLR: 1,
  PRIVATE_PENSION: 1,
  PRODUCTIVITY_BONUS: 1,
  PSYCHOLOGICAL_HELP: 1,
  REFERRAL_BONUS: 1,
  STOCK_OPTIONS: 1,
  THIRTEENTH_SALARY: 1,
  TRANSPORTATION_VOUCHER: 1,
  USD_SALARY: 1,
};

export default memo(MultipleTags);
