import { uniq } from "lodash";
import { stringContainsAny } from "../utils/utils";

const SKILLS_REGEX = {
  AGILE: [/agile/i, /scrum/i, /kanban/i, /pair programming/i, /tdd/i, /clean architectures/i, /metodologias ágeis/i, /metodologias ageis/i, /metodologias ágeis/i],
  ANGULAR: [/angular/i],
  ANTD: [/antd/i, /ant design/i, /ant-design/i],
  AJAX: [/ajax/i],
  API: [/rest api/i, /apis restful/i, /api restful/i, /api/i, /apis rest/i, /soap/i, /graphql/],
  APOLLO: [/apollo/i],
  BACHELORS_DEGREE: [/bachelor's degree/i, /computer science/i, /bacharelado/i, /ciência da computação/i, /graduado/i, /ensino superior/i, /formação superior/i],
  COBOL: [/cobol/i],
  CODE_MAINTAINABILITY: [/eslint/i, /prettier/i],
  CODE_VERSIONING: [/git/i, /gitlab/i, /git lab/i, /github/i, /bitbucket/i, /svn/i, /controle de versionamento/i, /version control/i],
  CPLUSPLUS: [/c\+\+/i],
  CSHARP: [/c#/i],
  CSS: [/css/i, /scss/i, /css3/i],
  DART: [/dart/i],
  DB: [/banco de dados/i, /mongodb/i, /sql/i, /sql server/i, /postgres/i, /mysql/i, /firebase/i, /redis/i, /no sql/i, /nosql/i, /orm/i, /postgre/i, /oracle/i],
  DELPHI: [/delphi/i],
  DEV_OPS: [/docker/i, /aws/i, /kubernetes/i, /terraform/i, /azure/i, /jenkins/i, /ci\/cd/i, /ci-cd/i, /cloud/i, /containers/i, /devops/i],
  DJANGO: [/django/i],
  DOT_NET: [/\.net/i],
  ECOMMERCE: [/shopfy/i, /linx/i, /traycorp/i, /tray/i],
  ENGLISH: [/ingles/i, /english/i, /inglês/i],
  FIGMA: [/figma/i],
  FLUTTER: [/flutter/i],
  FRONTEND_BUILD_TOOLS: [/webpack/i, /babel/i, /\bnpm\b/i, /\byarn\b/i],
  FULL_STACK: [/full stack/i, /full-stack/i],
  GOLANG: [/golang/i],
  HTML: [/html/i, /html5/i],
  IONIC: [/ionic/i],
  JAVA: [/\bjava\b/i],
  JAVASCRIPT: [/javascript/i, /java script/i, /\bjs\b/i, /es6/i],
  JQUERY: [/jquery/i],
  KOTLIN: [/kotlin/i],
  LINUX: [/linux/i],
  MACHINE_LEARNING: [/machine learning/i],
  MATERIAL_UI: [/material-ui/i, /material ui/i, /\bmui\b/i],
  NEXT: [/next/i, /next.js/i, /nextjs/i],
  NUXT: [/nuxt/i, /nuxt.js/i, /nuxtjs/i],
  NODE: [/node/i, /node.js/i, /nodejs/i],
  PHP: [/php/i, /laravel/i, /symfony/i],
  POWER_BI: [/power bi/i],
  PYTHON: [/python/i, /phyton/i],
  PWA: [/pwa/i],
  REACT: [/react/i, /react.js/i, /reactjs/i, /react js/i],
  REACT_NATIVE: [/react native/i, /react-native/i],
  REACT_ROUTER: [/react router/i],
  RESPONSIVE_DESIGN: [/design responsivo/i, /sites responsivos/i, /responsividade/i],
  RUBY: [/ruby/i, /ruby on rails/i, /rails/i],
  RUST: [/rust/i],
  SASS: [/sass/i],
  SALESFORCE: [/salesforce/i],
  SCALA: [/scala/i],
  STATE_MANAGEMENT: [/redux/i, /mobx/i, /state management/i, /bibliotecas de gerenciamento de estado/i, /recoil/i],
  STORYBOOK: [/storybook/i],
  STYLED_COMPONENTS: [/styled components/i, /styled-components/i],
  SWIFT: [/swift/i],
  TAILWIND: [/tailwindcss/i, /tailwind css/i],
  TEST: [/jest/i, /cypress/i, /tdd/i, /e2e/i, /testes unitarios/i, /testes unitários/i, /testes automatizados/i, /de integração/i, /teste de software/i, /testes/i, /testes funcionais automatizados/i, /teste e depuração/i, /testes de unidade/i, /testes de performance/i, /enzyme/i, /react testing library/i],
  TYPESCRIPT: [/typescript/i, /type script/i, /\bts\b/i],
  VANILLA: [/javascript vanilla/i, /vanilla/i, /vanillajs/i, /vanilla js/i],
  VUE: [/vue/i, /vue.js/i, /vuejs/i, /vue js/i],
  WEB_HOOKS: [/webhooks/i, /web hooks/i],
  WORDPRESS: [/wordpress/i],
}
enum JobSkill {
  AGILE = "AGILE",
  ANGULAR = "ANGULAR",
  ANTD = "ANTD",
  AJAX = "AJAX",
  API = "API",
  APOLLO = "APOLLO",
  BACHELORS_DEGREE = "BACHELORS_DEGREE",
  COBOL = "COBOL",
  CODE_MAINTAINABILITY = "CODE_MAINTAINABILITY",
  CODE_VERSIONING = "CODE_VERSIONING",
  CPLUSPLUS = "CPLUSPLUS",
  CSS = "CSS",
  CSHARP = "CSHARP",
  DART = "DART",
  DB = "DB",
  DELPHI = "DELPHI",
  DEV_OPS = "DEV_OPS",
  DJANGO = "DJANGO",
  DOT_NET = "DOT_NET",
  ECOMMERCE = "ECOMMERCE",
  ENGLISH = "ENGLISH",
  FIGMA = "FIGMA",
  FLUTTER = "FLUTTER",
  FRONTEND_BUILD_TOOLS = "FRONTEND_BUILD_TOOLS",
  FULL_STACK = "FULL_STACK",
  GOLANG = "GOLANG",
  HTML = "HTML",
  IONIC = "IONIC",
  JAVA = "JAVA",
  JAVASCRIPT = "JAVASCRIPT",
  JQUERY = "JQUERY",
  KOTLIN = "KOTLIN",
  LINUX = "LINUX",
  MACHINE_LEARNING = "MACHINE_LEARNING",
  MATERIAL_UI = "MATERIAL_UI",
  NEXT = "NEXT",
  NUXT = "NUXT",
  NODE = "NODE",
  PHP = "PHP",
  POWER_BI = "POWER_BI",
  PYTHON = "PYTHON",
  PWA = "PWA",
  REACT = "REACT",
  REACT_NATIVE = "REACT_NATIVE",
  REACT_ROUTER = "REACT_ROUTER",
  RESPONSIVE_DESIGN = "RESPONSIVE_DESIGN",
  RUBY = "RUBY",
  RUST = "RUST",
  SASS = "SASS",
  SALESFORCE = "SALESFORCE",
  SCALA = "SCALA",
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
const SKILL_RATING = {
  "AGILE": 1,
  "ANGULAR": -1,
  "ANTD": 1,
  "AJAX": -1,
  "API": 0,
  "APOLLO": 1,
  "BACHELORS_DEGREE": 1,
  "COBOL": -1,
  "CODE_MAINTAINABILITY": 1,
  "CODE_VERSIONING": 1,
  "CPLUSPLUS": -1,
  "CSHARP": -1,
  "CSS": 1,
  "DART": -1,
  "DB": 0,
  "DELPHI": -1,
  "DEV_OPS": -1,
  "DJANGO": 0,
  "DOT_NET": -1,
  "ECOMMERCE": 0,
  "ENGLISH": 0,
  "FIGMA": 1,
  "FLUTTER": -1,
  "FRONTEND_BUILD_TOOLS": 1,
  "FULL_STACK": 0,
  "GOLANG": -1,
  "HTML": 1,
  "IONIC": -1,
  "JAVA": -1,
  "JAVASCRIPT": 1,
  "JQUERY": -1,
  "KOTLIN": -1,
  "LINUX": 0,
  "MACHINE_LEARNING": -1,
  "MATERIAL_UI": 1,
  "NEXT": 1,
  "NUXT": -1,
  "NODE": 1,
  "PHP": -1,
  "POWER_BI": -1,
  "PYTHON": 0,
  "PWA": 0,
  "REACT": 1,
  "REACT_NATIVE": -1,
  "REACT_ROUTER": 1,
  "RESPONSIVE_DESIGN": 1,
  "RUBY": -1,
  "RUST": -1,
  "SASS": 1,
  "SALESFORCE": -1,
  "SCALA": -1,
  "STATE_MANAGEMENT": 1,
  "STORYBOOK": 1,
  "STYLED_COMPONENTS": 1,
  "SWIFT": -1,
  "TAILWIND": 0,
  "TEST": 1,
  "TYPESCRIPT": 1,
  "VANILLA": -1,
  "VUE": -1,
  "WEB_HOOKS": 1,
  "WORDPRESS": -1,
}

const BENEFITS_REGEX = {
  ANUAL_BONUS: [/bônus anual/i, /bonus per year/i, /bonificação anual/i],
  BIRTHDAY_DAYOFF: [/day off de aniversário/i, /day off/i, /day-off/i, /dia de folga na semana do seu aniversário/i],
  COURSE_HELP: [/curso de aperfeiçoamento profissional/i, /learning and development support/i, /investimento em cursos/i, /incentivo a estudos/i, /programa de capacitação/i, /alura/i, /acesso a cursos/i, /curso de/i, /aquisição de livros e cursos/i],
  DENTAL_PLAN: [/plano odontológico/i, /convênio odontológico/i, /convênio médico e odontológico/i, /plano de saúde e odontológico/i, /assistência médica e odontológica/i, /dental/i, /assistência odontológica/i],
  FLEXIBLE_HOURS: [/horários flexíveis/i, /horário flexível/i, /flexible hours/i, /flexibilidade de horário/i, /flexible schedule/i, /flexible working schedules/i,],
  GYMPASS: [/gympass/i, /academia/i, /gym pass/i, /auxílio academia/i, /totalpass/i],
  HEALTH_PLAN: [/plano de saúde/i, /convênio saúde/i, /convênio médico e odontológico/i, /plano de saúde e odontológico/i, /assistência médica e odontológica/i, /health care/i, /assistência médica/i, /convênio médico/i, /health insurance/i, /Health plan/i],
  HOME_OFFICE_VOUCHER: [/auxílio home office/i, /subsídio para trabalho remoto/i, /auxílio home-office/i, /auxílio para atuação em home office/i, /remote work allowance/i, /auxílio para trabalho remoto/i],
  LIFE_INSURANCE: [/seguro de vida/i, /life insurance/i],
  MEAL_VOUCHER: [/alimentação/i, /refeição/i, /caju/i, /\bva\b/i, /\bvr\b/i, /flex food/i, /to use with food/i],
  PAID_VACATIONS: [/férias remuneradas/i, /férias anuais remuneradas/i, /descanso anual/i, /descanso remunerado/i, /paid annual leave/i],
  PRIVATE_PENSION: [/previdência privada/i],
  PSYCHOLOGICAL_HELP: [/auxílio psicológico/i, /apoio psicológico/i, /mental health/i, /apoio à saúde mental/i, /cuidado com saúde mental/i, /auxílio saúde emocional/i],
  REFERRAL_BONUS: [/bônus indicação/i, /program of indication/i, /indicação premiada/i],
  STOCK_OPTIONS: [/stock options/i],
  TRANSPORTATION_VOUCHER: [/vale transporte/i],
  USD_SALARY: [/salary in usd/i],
}
enum JobBenefit {
  ANUAL_BONUS = "ANUAL_BONUS",
  BIRTHDAY_DAYOFF = "BIRTHDAY_DAYOFF",
  COURSE_HELP = "COURSE_HELP",
  DENTAL_PLAN = "DENTAL_PLAN",
  FLEXIBLE_HOURS = "FLEXIBLE_HOURS",
  GYMPASS = "GYMPASS",
  HEALTH_PLAN = "HEALTH_PLAN",
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
const BENEFITS_RATING = {
  "ANUAL_BONUS": 1,
  "BIRTHDAY_DAYOFF": 1,
  "COURSE_HELP": 1,
  "DENTAL_PLAN": 1,
  "FLEXIBLE_HOURS": 2,
  "GYMPASS": 2,
  "HEALTH_PLAN": 2,
  "HOME_OFFICE_VOUCHER": 2,
  "LIFE_INSURANCE": 1,
  "MEAL_VOUCHER": 1,
  "PAID_VACATIONS": 1,
  "PRIVATE_PENSION": 1,
  "PSYCHOLOGICAL_HELP": 1,
  "REFERRAL_BONUS": 1,
  "STOCK_OPTIONS": 1,
  "TRANSPORTATION_VOUCHER": 1,
  "USD_SALARY": 1,
}

const HIRING_REGIMES_REGEX = {
  CLT: [/\bclt\b/i],
  PJ: [/\bpj\b/i, /\bpessoa juridica\b/i, /\bpessoa jurídica\b/i],
}
enum JobHiringRegime {
  PJ = "PJ",
  CLT = "CLT",
}

const TYPES_REGEX = {
  REMOTE: [/\bhome office\b/i, /\bremoto\b/i, /\btrabalhar de casa\b/i, /\bremote\b/i, /\bremota\b/i],
  HYBRID: [/\bhíbrido\b/i, /hibrido\b/i, /hybrid\b/i],
  FACE_TO_FACE: [/\bpresencial\b/i],
}
enum JobType {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FACE_TO_FACE = "FACE_TO_FACE",
}

export const getSkillsBasedOnDescription = (job: { skills?: string[], description: string }): JobSkill[] => {
  const existentSkills = job.skills;
  const description = job.description;

  const skills: JobSkill[] = existentSkills?.length ? [...existentSkills as JobSkill[]] : [];

  if (stringContainsAny(description, SKILLS_REGEX.AGILE)) skills.push(JobSkill.AGILE);
  if (stringContainsAny(description, SKILLS_REGEX.ANGULAR)) skills.push(JobSkill.ANGULAR);
  if (stringContainsAny(description, SKILLS_REGEX.ANTD)) skills.push(JobSkill.ANTD);
  if (stringContainsAny(description, SKILLS_REGEX.AJAX)) skills.push(JobSkill.AJAX);
  if (stringContainsAny(description, SKILLS_REGEX.API)) skills.push(JobSkill.API);
  if (stringContainsAny(description, SKILLS_REGEX.APOLLO)) skills.push(JobSkill.APOLLO);
  if (stringContainsAny(description, SKILLS_REGEX.BACHELORS_DEGREE)) skills.push(JobSkill.BACHELORS_DEGREE);
  if (stringContainsAny(description, SKILLS_REGEX.COBOL)) skills.push(JobSkill.COBOL);
  if (stringContainsAny(description, SKILLS_REGEX.CODE_MAINTAINABILITY)) skills.push(JobSkill.CODE_MAINTAINABILITY);
  if (stringContainsAny(description, SKILLS_REGEX.CODE_VERSIONING)) skills.push(JobSkill.CODE_VERSIONING);
  if (stringContainsAny(description, SKILLS_REGEX.CPLUSPLUS)) skills.push(JobSkill.CPLUSPLUS);
  if (stringContainsAny(description, SKILLS_REGEX.CSS)) skills.push(JobSkill.CSS);
  if (stringContainsAny(description, SKILLS_REGEX.CSHARP)) skills.push(JobSkill.CSHARP);
  if (stringContainsAny(description, SKILLS_REGEX.DART)) skills.push(JobSkill.DART);
  if (stringContainsAny(description, SKILLS_REGEX.DB)) skills.push(JobSkill.DB);
  if (stringContainsAny(description, SKILLS_REGEX.DELPHI)) skills.push(JobSkill.DELPHI);
  if (stringContainsAny(description, SKILLS_REGEX.DEV_OPS)) skills.push(JobSkill.DEV_OPS);
  if (stringContainsAny(description, SKILLS_REGEX.DJANGO)) skills.push(JobSkill.DJANGO);
  if (stringContainsAny(description, SKILLS_REGEX.DOT_NET)) skills.push(JobSkill.DOT_NET);
  if (stringContainsAny(description, SKILLS_REGEX.ECOMMERCE)) skills.push(JobSkill.ECOMMERCE);
  if (stringContainsAny(description, SKILLS_REGEX.ENGLISH)) skills.push(JobSkill.ENGLISH);
  if (stringContainsAny(description, SKILLS_REGEX.FIGMA)) skills.push(JobSkill.FIGMA);
  if (stringContainsAny(description, SKILLS_REGEX.FLUTTER)) skills.push(JobSkill.FLUTTER);
  if (stringContainsAny(description, SKILLS_REGEX.FRONTEND_BUILD_TOOLS)) skills.push(JobSkill.FRONTEND_BUILD_TOOLS);
  if (stringContainsAny(description, SKILLS_REGEX.FULL_STACK)) skills.push(JobSkill.FULL_STACK);
  if (stringContainsAny(description, SKILLS_REGEX.GOLANG)) skills.push(JobSkill.GOLANG);
  if (stringContainsAny(description, SKILLS_REGEX.HTML)) skills.push(JobSkill.HTML);
  if (stringContainsAny(description, SKILLS_REGEX.IONIC)) skills.push(JobSkill.IONIC);
  if (stringContainsAny(description, SKILLS_REGEX.JAVA)) skills.push(JobSkill.JAVA);
  if (stringContainsAny(description, SKILLS_REGEX.JAVASCRIPT)) skills.push(JobSkill.JAVASCRIPT);
  if (stringContainsAny(description, SKILLS_REGEX.JQUERY)) skills.push(JobSkill.JQUERY);
  if (stringContainsAny(description, SKILLS_REGEX.KOTLIN)) skills.push(JobSkill.KOTLIN);
  if (stringContainsAny(description, SKILLS_REGEX.LINUX)) skills.push(JobSkill.LINUX);
  if (stringContainsAny(description, SKILLS_REGEX.MACHINE_LEARNING)) skills.push(JobSkill.MACHINE_LEARNING);
  if (stringContainsAny(description, SKILLS_REGEX.MATERIAL_UI)) skills.push(JobSkill.MATERIAL_UI);
  if (stringContainsAny(description, SKILLS_REGEX.NEXT)) skills.push(JobSkill.NEXT);
  if (stringContainsAny(description, SKILLS_REGEX.NUXT)) skills.push(JobSkill.NUXT);
  if (stringContainsAny(description, SKILLS_REGEX.NODE)) skills.push(JobSkill.NODE);
  if (stringContainsAny(description, SKILLS_REGEX.PHP)) skills.push(JobSkill.PHP);
  if (stringContainsAny(description, SKILLS_REGEX.POWER_BI)) skills.push(JobSkill.POWER_BI);
  if (stringContainsAny(description, SKILLS_REGEX.PYTHON)) skills.push(JobSkill.PYTHON);
  if (stringContainsAny(description, SKILLS_REGEX.PWA)) skills.push(JobSkill.PWA);
  if (stringContainsAny(description, SKILLS_REGEX.REACT)) skills.push(JobSkill.REACT);
  if (stringContainsAny(description, SKILLS_REGEX.REACT_NATIVE)) skills.push(JobSkill.REACT_NATIVE);
  if (stringContainsAny(description, SKILLS_REGEX.REACT_ROUTER)) skills.push(JobSkill.REACT_ROUTER);
  if (stringContainsAny(description, SKILLS_REGEX.RESPONSIVE_DESIGN)) skills.push(JobSkill.RESPONSIVE_DESIGN);
  if (stringContainsAny(description, SKILLS_REGEX.RUBY)) skills.push(JobSkill.RUBY);
  if (stringContainsAny(description, SKILLS_REGEX.RUST)) skills.push(JobSkill.RUST);
  if (stringContainsAny(description, SKILLS_REGEX.SASS)) skills.push(JobSkill.SASS);
  if (stringContainsAny(description, SKILLS_REGEX.SALESFORCE)) skills.push(JobSkill.SALESFORCE);
  if (stringContainsAny(description, SKILLS_REGEX.SCALA)) skills.push(JobSkill.SCALA);
  if (stringContainsAny(description, SKILLS_REGEX.STATE_MANAGEMENT)) skills.push(JobSkill.STATE_MANAGEMENT);
  if (stringContainsAny(description, SKILLS_REGEX.STORYBOOK)) skills.push(JobSkill.STORYBOOK);
  if (stringContainsAny(description, SKILLS_REGEX.STYLED_COMPONENTS)) skills.push(JobSkill.STYLED_COMPONENTS);
  if (stringContainsAny(description, SKILLS_REGEX.SWIFT)) skills.push(JobSkill.SWIFT);
  if (stringContainsAny(description, SKILLS_REGEX.TAILWIND)) skills.push(JobSkill.TAILWIND);
  if (stringContainsAny(description, SKILLS_REGEX.TEST)) skills.push(JobSkill.TEST);
  if (stringContainsAny(description, SKILLS_REGEX.TYPESCRIPT)) skills.push(JobSkill.TYPESCRIPT);
  if (stringContainsAny(description, SKILLS_REGEX.VANILLA)) skills.push(JobSkill.VANILLA);
  if (stringContainsAny(description, SKILLS_REGEX.VUE)) skills.push(JobSkill.VUE);
  if (stringContainsAny(description, SKILLS_REGEX.WEB_HOOKS)) skills.push(JobSkill.WEB_HOOKS);
  if (stringContainsAny(description, SKILLS_REGEX.WORDPRESS)) skills.push(JobSkill.WORDPRESS);

  return uniq(skills)?.sort((a, b) => a.localeCompare(b));
}

export const getBenefitsBasedOnDescription = (job: { benefits?: string[], description: string }): JobBenefit[] => {
  const existentBenefits = job.benefits;
  const description = job.description;

  const benefits: JobBenefit[] = existentBenefits?.length ? [...existentBenefits as JobBenefit[]] : [];

  if (stringContainsAny(description, BENEFITS_REGEX.ANUAL_BONUS)) benefits.push(JobBenefit.ANUAL_BONUS);
  if (stringContainsAny(description, BENEFITS_REGEX.BIRTHDAY_DAYOFF)) benefits.push(JobBenefit.BIRTHDAY_DAYOFF);
  if (stringContainsAny(description, BENEFITS_REGEX.COURSE_HELP)) benefits.push(JobBenefit.COURSE_HELP);
  if (stringContainsAny(description, BENEFITS_REGEX.DENTAL_PLAN)) benefits.push(JobBenefit.DENTAL_PLAN);
  if (stringContainsAny(description, BENEFITS_REGEX.FLEXIBLE_HOURS)) benefits.push(JobBenefit.FLEXIBLE_HOURS);
  if (stringContainsAny(description, BENEFITS_REGEX.GYMPASS)) benefits.push(JobBenefit.GYMPASS);
  if (stringContainsAny(description, BENEFITS_REGEX.HEALTH_PLAN)) benefits.push(JobBenefit.HEALTH_PLAN);
  if (stringContainsAny(description, BENEFITS_REGEX.HOME_OFFICE_VOUCHER)) benefits.push(JobBenefit.HOME_OFFICE_VOUCHER);
  if (stringContainsAny(description, BENEFITS_REGEX.LIFE_INSURANCE)) benefits.push(JobBenefit.LIFE_INSURANCE);
  if (stringContainsAny(description, BENEFITS_REGEX.MEAL_VOUCHER)) benefits.push(JobBenefit.MEAL_VOUCHER);
  if (stringContainsAny(description, BENEFITS_REGEX.PAID_VACATIONS)) benefits.push(JobBenefit.PAID_VACATIONS);
  if (stringContainsAny(description, BENEFITS_REGEX.PRIVATE_PENSION)) benefits.push(JobBenefit.PRIVATE_PENSION);
  if (stringContainsAny(description, BENEFITS_REGEX.PSYCHOLOGICAL_HELP)) benefits.push(JobBenefit.PSYCHOLOGICAL_HELP);
  if (stringContainsAny(description, BENEFITS_REGEX.REFERRAL_BONUS)) benefits.push(JobBenefit.REFERRAL_BONUS);
  if (stringContainsAny(description, BENEFITS_REGEX.STOCK_OPTIONS)) benefits.push(JobBenefit.STOCK_OPTIONS);
  if (stringContainsAny(description, BENEFITS_REGEX.TRANSPORTATION_VOUCHER)) benefits.push(JobBenefit.TRANSPORTATION_VOUCHER);
  if (stringContainsAny(description, BENEFITS_REGEX.USD_SALARY)) benefits.push(JobBenefit.USD_SALARY);

  return uniq(benefits)?.sort((a, b) => a.localeCompare(b));
}

export const getProgramathorNormalizedSkill = (skill: string): JobSkill | string => {
  const allSkills = Object.keys(JobSkill);
  if (allSkills?.includes(skill)) return skill;

  const lowerCaseSkill = skill?.toLowerCase();
  switch (lowerCaseSkill) {
    case 'angular': return JobSkill.ANGULAR;
    case 'bootstrap': return JobSkill.CSS;
    case 'css': return JobSkill.CSS;
    case 'docker': return JobSkill.DEV_OPS;
    case 'flutter': return JobSkill.FLUTTER;
    case 'git': return JobSkill.CODE_VERSIONING;
    case 'google cloud': return JobSkill.DEV_OPS;
    case 'graphql': return JobSkill.API;
    case 'html': return JobSkill.HTML;
    case 'ionic': return JobSkill.IONIC;
    case 'mongodb': return JobSkill.DB;
    case 'nextjs': return JobSkill.NEXT;
    case 'node.js': return JobSkill.NODE;
    case 'javaScript': return JobSkill.JAVASCRIPT;
    case 'reactjs': return JobSkill.REACT;
    case 'react native': return JobSkill.REACT_NATIVE;
    case 'restful': return JobSkill.API;
    case 'sass': return JobSkill.SASS;
    case 'sql': return JobSkill.DB;
    case 'styled - components': return JobSkill.STYLED_COMPONENTS;
    case 'typescript': return JobSkill.TYPESCRIPT;
    case 'vava': return JobSkill.JAVA;
    case 'vue.js': return JobSkill.VUE;
    case 'wordpress': return JobSkill.WORDPRESS;

    default: {
      console.log(`[getProgramathorNormalizedSkill] Skill not founded: ${lowerCaseSkill}`)
      return lowerCaseSkill?.toUpperCase();
    }
  }
}

export const getRatingsBasedOnSkillsAndBenefits = (job: { skills?: string[], benefits?: string[] }): { skillsRating: number, benefitsRating: number } => {
  let skillsRating = 0;
  let benefitsRating = 0;

  for (const skill of job.skills) {
    skillsRating += SKILL_RATING?.[skill];
  }

  for (const benefit of job.benefits) {
    benefitsRating += BENEFITS_RATING?.[benefit];
  }

  return {
    skillsRating: skillsRating || 0,
    benefitsRating: benefitsRating || 0,
  };
}

export const getHiringRegimeBasedOnDescription = (job: { description: string }): JobHiringRegime => {
  if (stringContainsAny(job.description, HIRING_REGIMES_REGEX.CLT)) return JobHiringRegime.CLT;
  if (stringContainsAny(job.description, HIRING_REGIMES_REGEX.PJ)) return JobHiringRegime.PJ;

  return JobHiringRegime.PJ;
}

export const getTypeBasedOnDescription = (job: { description: string }): JobType => {
  if (stringContainsAny(job.description, TYPES_REGEX.REMOTE)) return JobType.REMOTE;
  if (stringContainsAny(job.description, TYPES_REGEX.HYBRID)) return JobType.HYBRID;
  if (stringContainsAny(job.description, TYPES_REGEX.FACE_TO_FACE)) return JobType.FACE_TO_FACE;

  return JobType.REMOTE;
}