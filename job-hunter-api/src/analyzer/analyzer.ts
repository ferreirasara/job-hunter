import { uniq } from "lodash";
import { stringContainsAny } from "../utils/utils";
import JobOpportunityController from "../controllers/JobOpportunity.controller";

const SKILLS = {
  AGILE: [/agile/i, /scrum/i, /kanban/i, /pair programming/i, /tdd/i, /clean architectures/i],
  ANGULAR: [/angular/i],
  AJAX: [/ajax/i],
  API: [/rest api/i, /apis restful/i, /api restful/i, /api/i, /apis rest/i, /soap/i, /graphql/],
  BACHELORS_DEGREE: [/bachelor's degree/i, /computer science/i, /bacharelado/i, /ciência da computação/i],
  CODE_MAINTAINABILITY: [/eslint/i, /prettier/i],
  CODE_VERSIONING: [/git/i, /gitlab/i, /git lab/i, /github/i, /bitbucket/i, /svn/i, /controle de versionamento/i],
  CPLUSPLUS: [/c\+\+/i],
  CSHARP: [/c#/i],
  CSS: [/css/i, /scss/i, /css3/i],
  DART: [/dart/i],
  DB: [/banco de dados/i, /mongodb/i, /sql/i, /sql server/i, /postgres/i, /mysql/i, /firebase/i, /redis/i, /no sql/i, /nosql/i, /orm/i],
  DEV_OPS: [/docker/i, /aws/i, /kubernetes/i, /terraform/i, /azure/i, /jenkins/i, /ci\/cd/i, /ci-cd/i, /cloud/i, /containers/i],
  DOT_NET: [/.net/i],
  ECOMMERCE: [/shopfy/i, /linx/i, /traycorp/i, /tray/i],
  ENGLISH: [/ingles/i, /english/i, /inglês/i],
  FIGMA: [/figma/i],
  FLUTTER: [/flutter/i],
  FULL_STACK: [/full stack/i, /full-stack/i],
  HTML: [/html/i, /html5/i],
  IONIC: [/ionic/i],
  JAVA: [/java/i],
  JAVASCRIPT: [/javascript/i, /java script/i, /js/i, /es6/i],
  JQUERY: [/jquery/i],
  LINUX: [/linux/i],
  NEXT: [/next/i, /next.js/i, /nextjs/i],
  NUXT: [/nuxt/i, /nuxt.js/i, /nuxtjs/i],
  NODE: [/node/i, /node.js/i, /nodejs/i],
  PHP: [/php/i, /laravel/i, /symfony/i],
  PYTHON: [/python/i],
  PWA: [/pwa/i],
  REACT: [/react/i, /react.js/i, /reactjs/i, /react js/i],
  REACT_NATIVE: [/react native/i, /react-native/i],
  RESPONSIVE_DESIGN: [/design responsivo/i, /sites responsivos/i],
  RUBY: [/ruby/i, /ruby on rails/i],
  SASS: [/sass/i],
  STATE_MANAGEMENT: [/redux/i, /mobx/i, /state management/i],
  STORYBOOK: [/storybook/i],
  STYLED_COMPONENTS: [/styled components/i, /styled-components/i],
  TAILWIND: [/tailwindcss/i, /tailwind css/i],
  TEST: [/jest/i, /cypress/i, /tdd/i, /e2e/i, /testes unitarios/i, /testes automatizados/i, /de integração/i, /teste de software/i],
  TYPESCRIPT: [/typescript/i, /type script/i, /ts/i],
  VANILLA: [/javascript vanilla/i, /vanilla/i, /vanillajs/i, /vanilla js/i],
  VUE: [/vue/i, /vue.js/i, /vuejs/i, /vue js/i],
  WEB_HOOKS: [/webhooks/i, /web hooks/i],
  WORDPRESS: [/wordpress/i],
}
enum JobSkills {
  AGILE = "AGILE",
  ANGULAR = "ANGULAR",
  AJAX = "AJAX",
  API = "API",
  BACHELORS_DEGREE = "BACHELORS_DEGREE",
  CODE_MAINTAINABILITY = "CODE_MAINTAINABILITY",
  CODE_VERSIONING = "CODE_VERSIONING",
  CPLUSPLUS = "CPLUSPLUS",
  CSS = "CSS",
  CSHARP = "CSHARP",
  DART = "DART",
  DB = "DB",
  DEV_OPS = "DEV_OPS",
  DOT_NET = "DOT_NET",
  ECOMMERCE = "ECOMMERCE",
  ENGLISH = "ENGLISH",
  FIGMA = "FIGMA",
  FLUTTER = "FLUTTER",
  FULL_STACK = "FULL_STACK",
  HTML = "HTML",
  IONIC = "IONIC",
  JAVA = "JAVA",
  JAVASCRIPT = "JAVASCRIPT",
  JQUERY = "JQUERY",
  LINUX = "LINUX",
  NEXT = "NEXT",
  NUXT = "NUXT",
  NODE = "NODE",
  PHP = "PHP",
  PYTHON = "PYTHON",
  PWA = "PWA",
  REACT = "REACT",
  REACT_NATIVE = "REACT_NATIVE",
  RESPONSIVE_DESIGN = "RESPONSIVE_DESIGN",
  RUBY = "RUBY",
  SASS = "SASS",
  STATE_MANAGEMENT = "STATE_MANAGEMENT",
  STORYBOOK = "STORYBOOK",
  STYLED_COMPONENTS = "STYLED_COMPONENTS",
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
  "AJAX": -1,
  "API": 0,
  "BACHELORS_DEGREE": 1,
  "CODE_MAINTAINABILITY": 1,
  "CODE_VERSIONING": 1,
  "CPLUSPLUS": -1,
  "CSHARP": -1,
  "CSS": 1,
  "DART": -1,
  "DB": 0,
  "DEV_OPS": -1,
  "DOT_NET": -1,
  "ECOMMERCE": 0,
  "ENGLISH": 0,
  "FIGMA": 1,
  "FLUTTER": -1,
  "FULL_STACK": 0,
  "HTML": 1,
  "IONIC": -1,
  "JAVA": -1,
  "JAVASCRIPT": 1,
  "JQUERY": -1,
  "LINUX": 0,
  "NEXT": 1,
  "NUXT": -1,
  "NODE": 1,
  "PHP": -1,
  "PYTHON": 0,
  "PWA": 0,
  "REACT": 1,
  "REACT_NATIVE": -1,
  "RESPONSIVE_DESIGN": 1,
  "RUBY": -1,
  "SASS": 1,
  "STATE_MANAGEMENT": 1,
  "STORYBOOK": 1,
  "STYLED_COMPONENTS": 1,
  "TAILWIND": 0,
  "TEST": 1,
  "TYPESCRIPT": 1,
  "VANILLA": -1,
  "VUE": -1,
  "WEB_HOOKS": 1,
  "WORDPRESS": -1,
}

const BENEFITS = {
  ANUAL_BONUS: [/bônus anual/i, /bonus per year/i],
  BIRTHDAY_DAYOFF: [/day off de aniversário/i, /day off/i, /dia de folga na semana do seu aniversário/i],
  CLT: [/clt/i],
  COURSE_HELP: [/curso de aperfeiçoamento profissional/i, /learning and development support/i, /investimento em cursos/i, /incentivo a estudos/i, /programa de capacitação/i, /alura/i, /acesso a cursos/i, /curso de/i],
  DENTAL_PLAN: [/plano odontológico/i, /convênio odontológico/i, /convênio médico e odontológico/i, /plano de saúde e odontológico/i, /assistência médica e odontológica/i, /dental/i, /assistência odontológica/i],
  FLEXIBLE_HOURS: [/horários flexíveis/i, /horário flexível/i, /flexible hours/i, /flexibilidade de horário/i],
  GYMPASS: [/gympass/i, /academia/i, /gym pass/i],
  HEALTH_PLAN: [/plano de saúde/i, /convênio saúde/i, /convênio médico e odontológico/i, /plano de saúde e odontológico/i, /assistência médica e odontológica/i, /health care/i, /assistência médica/i],
  HOME_OFFICE: [/home office/i, /remoto/i, /trabalhar de casa/i, /remote/i],
  HOME_OFFICE_VOUCHER: [/auxílio home office/i, /subsídio para trabalho remoto/i],
  LIFE_INSURANCE: [/seguro de vida/i, /life insurance/i],
  MEAL_VOUCHER: [/alimentação/i, /refeição/i, /caju/i, /va/i, /vr/i, /flex food/i],
  PAID_VACATIONS: [/férias remuneradas/i, /férias anuais remuneradas/i],
  PJ: [/pj/i],
  PRIVATE_PENSION: [/previdência privada/i],
  PSYCHOLOGICAL_HELP: [/auxílio psicológico/i, /apoio psicológico/i, /mental health/i, /apoio à saúde mental/i],
  REFERRAL_BONUS: [/bônus indicação/i, /program of indication/i, /indicação premiada/i],
  STOCK_OPTIONS: [/stock options/i],
  TRANSPORTATION_VOUCHER: [/vale transporte/i],
}
enum JobBenefits {
  ANUAL_BONUS = "ANUAL_BONUS",
  BIRTHDAY_DAYOFF = "BIRTHDAY_DAYOFF",
  CLT = "CLT",
  COURSE_HELP = "COURSE_HELP",
  DENTAL_PLAN = "DENTAL_PLAN",
  FLEXIBLE_HOURS = "FLEXIBLE_HOURS",
  GYMPASS = "GYMPASS",
  HEALTH_PLAN = "HEALTH_PLAN",
  HOME_OFFICE = "HOME_OFFICE",
  HOME_OFFICE_VOUCHER = "HOME_OFFICE_VOUCHER",
  LIFE_INSURANCE = "LIFE_INSURANCE",
  MEAL_VOUCHER = "MEAL_VOUCHER",
  PAID_VACATIONS = "PAID_VACATIONS",
  PJ = "PJ",
  PRIVATE_PENSION = "PRIVATE_PENSION",
  PSYCHOLOGICAL_HELP = "PSYCHOLOGICAL_HELP",
  REFERRAL_BONUS = "REFERRAL_BONUS",
  STOCK_OPTIONS = "STOCK_OPTIONS",
  TRANSPORTATION_VOUCHER = "TRANSPORTATION_VOUCHER",
}
const BENEFITS_RATING = {
  "ANUAL_BONUS": 0,
  "BIRTHDAY_DAYOFF": 0,
  "CLT": 1,
  "COURSE_HELP": 0,
  "DENTAL_PLAN": 0,
  "FLEXIBLE_HOURS": 1,
  "GYMPASS": 1,
  "HEALTH_PLAN": 1,
  "HOME_OFFICE": 1,
  "HOME_OFFICE_VOUCHER": 1,
  "LIFE_INSURANCE": 0,
  "MEAL_VOUCHER": 1,
  "PAID_VACATIONS": 0,
  "PJ": 0,
  "PRIVATE_PENSION": 0,
  "PSYCHOLOGICAL_HELP": 0,
  "REFERRAL_BONUS": 0,
  "STOCK_OPTIONS": 0,
  "TRANSPORTATION_VOUCHER": 0,
}

export const getSkillsBasedOnDescription = (job: { skills?: string[], description: string }) => {
  const existentSkills = job.skills;
  const description = job.description;

  const skills: JobSkills[] = existentSkills?.length ? [...existentSkills as JobSkills[]] : [];

  if (stringContainsAny(description, SKILLS.API)) skills.push(JobSkills.API);
  if (stringContainsAny(description, SKILLS.ANGULAR)) skills.push(JobSkills.ANGULAR)
  if (stringContainsAny(description, SKILLS.AJAX)) skills.push(JobSkills.AJAX)
  if (stringContainsAny(description, SKILLS.API)) skills.push(JobSkills.API)
  if (stringContainsAny(description, SKILLS.CODE_MAINTAINABILITY)) skills.push(JobSkills.CODE_MAINTAINABILITY)
  if (stringContainsAny(description, SKILLS.CSHARP)) skills.push(JobSkills.CSHARP)
  if (stringContainsAny(description, SKILLS.CPLUSPLUS)) skills.push(JobSkills.CPLUSPLUS)
  if (stringContainsAny(description, SKILLS.CSS)) skills.push(JobSkills.CSS)
  if (stringContainsAny(description, SKILLS.DB)) skills.push(JobSkills.DB)
  if (stringContainsAny(description, SKILLS.DEV_OPS)) skills.push(JobSkills.DEV_OPS)
  if (stringContainsAny(description, SKILLS.DOT_NET)) skills.push(JobSkills.DOT_NET)
  if (stringContainsAny(description, SKILLS.ECOMMERCE)) skills.push(JobSkills.ECOMMERCE)
  if (stringContainsAny(description, SKILLS.ENGLISH)) skills.push(JobSkills.ENGLISH)
  if (stringContainsAny(description, SKILLS.FIGMA)) skills.push(JobSkills.FIGMA)
  if (stringContainsAny(description, SKILLS.FLUTTER)) skills.push(JobSkills.FLUTTER)
  if (stringContainsAny(description, SKILLS.CODE_VERSIONING)) skills.push(JobSkills.CODE_VERSIONING)
  if (stringContainsAny(description, SKILLS.HTML)) skills.push(JobSkills.HTML)
  if (stringContainsAny(description, SKILLS.IONIC)) skills.push(JobSkills.IONIC)
  if (stringContainsAny(description, SKILLS.JAVA)) skills.push(JobSkills.JAVA)
  if (stringContainsAny(description, SKILLS.JAVASCRIPT)) skills.push(JobSkills.JAVASCRIPT)
  if (stringContainsAny(description, SKILLS.JQUERY)) skills.push(JobSkills.JQUERY)
  if (stringContainsAny(description, SKILLS.LINUX)) skills.push(JobSkills.LINUX)
  if (stringContainsAny(description, SKILLS.NEXT)) skills.push(JobSkills.NEXT)
  if (stringContainsAny(description, SKILLS.NUXT)) skills.push(JobSkills.NUXT)
  if (stringContainsAny(description, SKILLS.NODE)) skills.push(JobSkills.NODE)
  if (stringContainsAny(description, SKILLS.PHP)) skills.push(JobSkills.PHP)
  if (stringContainsAny(description, SKILLS.PYTHON)) skills.push(JobSkills.PYTHON)
  if (stringContainsAny(description, SKILLS.PWA)) skills.push(JobSkills.PWA)
  if (stringContainsAny(description, SKILLS.REACT)) skills.push(JobSkills.REACT)
  if (stringContainsAny(description, SKILLS.REACT_NATIVE)) skills.push(JobSkills.REACT_NATIVE)
  if (stringContainsAny(description, SKILLS.RESPONSIVE_DESIGN)) skills.push(JobSkills.RESPONSIVE_DESIGN)
  if (stringContainsAny(description, SKILLS.RUBY)) skills.push(JobSkills.RUBY)
  if (stringContainsAny(description, SKILLS.SASS)) skills.push(JobSkills.SASS)
  if (stringContainsAny(description, SKILLS.STATE_MANAGEMENT)) skills.push(JobSkills.STATE_MANAGEMENT)
  if (stringContainsAny(description, SKILLS.STORYBOOK)) skills.push(JobSkills.STORYBOOK)
  if (stringContainsAny(description, SKILLS.STYLED_COMPONENTS)) skills.push(JobSkills.STYLED_COMPONENTS)
  if (stringContainsAny(description, SKILLS.TAILWIND)) skills.push(JobSkills.TAILWIND)
  if (stringContainsAny(description, SKILLS.TEST)) skills.push(JobSkills.TEST)
  if (stringContainsAny(description, SKILLS.TYPESCRIPT)) skills.push(JobSkills.TYPESCRIPT)
  if (stringContainsAny(description, SKILLS.VANILLA)) skills.push(JobSkills.VANILLA)
  if (stringContainsAny(description, SKILLS.VUE)) skills.push(JobSkills.VUE)
  if (stringContainsAny(description, SKILLS.WEB_HOOKS)) skills.push(JobSkills.WEB_HOOKS)
  if (stringContainsAny(description, SKILLS.WORDPRESS)) skills.push(JobSkills.WORDPRESS)

  return uniq(skills);
}

export const getBenefitsBasedOnDescription = (job: { benefits?: string[], description: string }) => {
  const existentBenefits = job.benefits;
  const description = job.description;

  const benefits: JobBenefits[] = existentBenefits?.length ? [...existentBenefits as JobBenefits[]] : [];

  if (stringContainsAny(description, BENEFITS.ANUAL_BONUS)) benefits.push(JobBenefits.ANUAL_BONUS);
  if (stringContainsAny(description, BENEFITS.BIRTHDAY_DAYOFF)) benefits.push(JobBenefits.BIRTHDAY_DAYOFF);
  if (stringContainsAny(description, BENEFITS.CLT)) benefits.push(JobBenefits.CLT);
  if (stringContainsAny(description, BENEFITS.COURSE_HELP)) benefits.push(JobBenefits.COURSE_HELP);
  if (stringContainsAny(description, BENEFITS.DENTAL_PLAN)) benefits.push(JobBenefits.DENTAL_PLAN);
  if (stringContainsAny(description, BENEFITS.FLEXIBLE_HOURS)) benefits.push(JobBenefits.FLEXIBLE_HOURS);
  if (stringContainsAny(description, BENEFITS.GYMPASS)) benefits.push(JobBenefits.GYMPASS);
  if (stringContainsAny(description, BENEFITS.HEALTH_PLAN)) benefits.push(JobBenefits.HEALTH_PLAN);
  if (stringContainsAny(description, BENEFITS.HOME_OFFICE)) benefits.push(JobBenefits.HOME_OFFICE);
  if (stringContainsAny(description, BENEFITS.HOME_OFFICE_VOUCHER)) benefits.push(JobBenefits.HOME_OFFICE_VOUCHER);
  if (stringContainsAny(description, BENEFITS.LIFE_INSURANCE)) benefits.push(JobBenefits.LIFE_INSURANCE);
  if (stringContainsAny(description, BENEFITS.MEAL_VOUCHER)) benefits.push(JobBenefits.MEAL_VOUCHER);
  if (stringContainsAny(description, BENEFITS.PAID_VACATIONS)) benefits.push(JobBenefits.PAID_VACATIONS);
  if (stringContainsAny(description, BENEFITS.PJ)) benefits.push(JobBenefits.PJ);
  if (stringContainsAny(description, BENEFITS.PRIVATE_PENSION)) benefits.push(JobBenefits.PRIVATE_PENSION);
  if (stringContainsAny(description, BENEFITS.PSYCHOLOGICAL_HELP)) benefits.push(JobBenefits.PSYCHOLOGICAL_HELP);
  if (stringContainsAny(description, BENEFITS.REFERRAL_BONUS)) benefits.push(JobBenefits.REFERRAL_BONUS);
  if (stringContainsAny(description, BENEFITS.STOCK_OPTIONS)) benefits.push(JobBenefits.STOCK_OPTIONS);
  if (stringContainsAny(description, BENEFITS.TRANSPORTATION_VOUCHER)) benefits.push(JobBenefits.TRANSPORTATION_VOUCHER);

  return uniq(benefits);
}

export const normalizeProgramathorSkills = async () => {
  const programathorJobs = await JobOpportunityController.getAllJobsFromPlatform("PROGRAMATHOR");
  for (const job of programathorJobs) {
    const newSkills = getSkillsBasedOnDescription({ description: job.skills })
    await JobOpportunityController.updateSkills(job.uuid, newSkills?.join(','))
  }
}

export const getNormalizedSkill = (skill: string) => {
  switch (skill) {
    case 'docker': return JobSkills.DEV_OPS;
    case 'git': return JobSkills.CODE_VERSIONING;
    case 'reactjs': return JobSkills.REACT;
    case 'react native': return JobSkills.REACT_NATIVE;
    case 'html': return JobSkills.HTML;
    case 'css': return JobSkills.CSS;
    case 'sass': return JobSkills.SASS;
    case 'javaScript': return JobSkills.JAVASCRIPT;
    case 'vue.js': return JobSkills.VUE;
    case 'nextjs': return JobSkills.NEXT;
    case 'node.js': return JobSkills.NODE;
    // case 'SCRUM': return JobSkills.SCRUM;
    case 'typescript': return JobSkills.TYPESCRIPT;
    case 'vava': return JobSkills.JAVA;
    // case 'Less': return JobSkills.LESS;
    case 'wordpress': return JobSkills.WORDPRESS;
    case 'restful': return JobSkills.API;
    case 'flutter': return JobSkills.FLUTTER;
    case 'styled - components': return JobSkills.STYLED_COMPONENTS;
    case 'ionic': return JobSkills.IONIC;
    case 'angular': return JobSkills.ANGULAR;
    case 'google cloud': return JobSkills.DEV_OPS;
    case 'MongoDB': return JobSkills.DB;
    // case 'JSON': return JobSkills.JSON;
    case 'SQL': return JobSkills.DB;

    default: return skill?.toUpperCase();
  }
}

export const getJobRating = (job: { skills?: string[], benefits?: string[] }): { skillsRating: number, benefitsRating: number } => {
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