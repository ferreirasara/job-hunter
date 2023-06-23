import { uniq } from "lodash";
import { addMarkdown, removeAccent, stringContainsAny } from "../utils/utils";

export const SKILLS_REGEX = {
  AGILE: [/agile/i, /scrum/i, /kanban/i, /pair programming/i, /tdd/i, /clean architectures/i, /(metodologia(s)?|desenvolvimento) ag(eis|il)/i],
  ANGULAR: [/angular/i],
  ANTD: [/ant(-| )?d(esign)?/i],
  AJAX: [/ajax/i],
  API: [/rest(ful)? api(s)?/i, /api(s)? rest(ful)?/i, /\bapi\b/i, /soap/i, /graphql/],
  APOLLO: [/apollo/i],
  BACHELORS_DEGREE: [/bachelor's degree/i, /computer science/i, /bacharelado/i, /ciencia(s)? da computacao/i, /graduado/i, /ensino superior/i, /formacao superior/i, /superior completo/i, /graduacao completa/i],
  COBOL: [/cobol/i],
  CODE_MAINTAINABILITY: [/eslint/i, /prettier/i],
  CODE_VERSIONING: [/git( |-)?((lab|hub))?/i, /bitbucket/i, /\bsvn\b/i, /controle de vers(ionamento|ao)/i, /version control/i],
  CPLUSPLUS: [/c\+\+/i],
  CSHARP: [/c#/i, /csharp/i],
  CSS: [/(s)?css(3)?/i],
  DART: [/dart/i],
  DB: [/banco de dados/i, /data( )?base/i, /mongo( |-)?db/i, /\bsql\b/i, /((ms|microsoft)(-| )?)?sql( |-)?server/i, /postgre(s?)(sq)?/i, /my( |-)?sql/i, /firebase/i, /redis/i, /no( |-)?sql/i, /\b(type(-| )?)?orm\b/i, /oracle/i, /maria( |-)?db/i],
  DELPHI: [/delphi/i],
  DEV_OPS: [/docker/i, /\baws\b/i, /kubernetes/i, /terraform/i, /azure/i, /jenkins/i, /ci(\/|-)?cd/i, /cloud/i, /containers/i, /dev( )?ops/i, /git( |-)?(hub)? actions/i],
  DJANGO: [/django/i],
  DOT_NET: [/(\.|dot)net/i],
  ECOMMERCE: [/shopfy/i, /linx/i, /traycorp/i, /tray/i],
  ENGLISH: [/ingles/i, /english/i],
  FIGMA: [/figma/i],
  FLUTTER: [/flut(t)?er/i],
  FRONTEND_BUILD_TOOLS: [/webpack/i, /babel/i, /\bnpm\b/i, /\byarn\b/i],
  FULL_STACK: [/full(-| )?stack/i],
  GOLANG: [/golang/i],
  HTML: [/html(5)?/i],
  IONIC: [/ionic/i],
  JAVA: [/\bjava\b/i],
  JAVASCRIPT: [/javas( |-)?cript/i, /\bjs\b/i, /es6/i],
  JQUERY: [/jquery/i],
  KOTLIN: [/kotlin/i],
  LINUX: [/linux/i],
  MACHINE_LEARNING: [/machine learning/i],
  MATERIAL_UI: [/material(-| )?ui/i, /\bmui\b/i],
  NEXT: [/next(.| |-)?js/i],
  NUXT: [/nuxt(.| |-)?js/i],
  NODE: [/node(.| |-)?js/i],
  PHP: [/php/i, /laravel/i, /symfony/i],
  POWER_BI: [/power( |-)?bi/i],
  PYTHON: [/python/i, /phyton/i],
  PWA: [/pwa/i],
  REACT: [/react/i, /react(.| )?js/i],
  REACT_NATIVE: [/react(-| )native/i],
  REACT_ROUTER: [/react router/i],
  RESPONSIVE_DESIGN: [/design responsivo/i, /site(s)? responsivo(s)?/i, /responsividade/i],
  RUBY: [/ruby(( on )?(rails)?)?/i],
  RUST: [/rust/i],
  SASS: [/sass/i],
  SALESFORCE: [/salesforce/i],
  SCALA: [/\bscala\b/i],
  SHOPIFY: [/\shopify\b/i],
  STATE_MANAGEMENT: [/redux/i, /mobx/i, /state management/i, /(bibliotecas de )?gerenciamento de estado/i, /recoil/i],
  STORYBOOK: [/storybook/i],
  STYLED_COMPONENTS: [/styled( |-)?components/i],
  SWIFT: [/swift/i],
  TAILWIND: [/tailwind( |-)?css/i],
  TEST: [/jest/i, /cypress(.io)?/i, /tdd/i, /\be2e\b/i, /teste(s)? (funcionais)?((unitario|automatizado)(s)?|(de|e) (integracao|software|unidade|depuracao|performance))/i, /enzyme/i, /react testing library/i, /mocha/i],
  TYPESCRIPT: [/type( |-)?script/i, /\bts\b/i],
  VANILLA: [/(javascript|js)?( )?vanilla(( |.|-)?|js)?/i],
  VUE: [/vue((.|-| )?(js)?)?/i],
  WEB_HOOKS: [/web( |-)?hooks/i],
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
  "SHOPIFY": 1,
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

export const BENEFITS_REGEX = {
  ANUAL_BONUS: [/(annual )?(bonus|bonificacao) (anual|per year)/i],
  BIRTHDAY_DAYOFF: [/(day( |-)?off|(dia de )?folga)( n(o|a) (semana|mes))?( d(e|o)( seu)? aniversario)?/i],
  COURSE_HELP: [
    /curso de aperfeiçoamento profissional/i, /learning and development support/i, /investimento em cursos/i, /incentivo a estudos/i, /programa de capacitacao/i,
    /alura/i, /acesso a cursos/i, /curso de/i, /aquisicao de livros e cursos/i, /subsidio para estudo/i, /auxilio educacao/i, /auxilio educacao/i,
    / incentivo para educacao/i, /incentivo a cursos/i
  ],
  FLEXIBLE_HOURS: [/(flexibilidade de )?horario(s)?( flexive(l|is))?/i, /flexible (working )?(hour(s)?|schedule(s)?)/i],
  GYMPASS: [/(gym|total)( |-)?pass/i, /(auxilio )?academia/i],
  HEALTH_OR_DENTAL_PLAN: [/(plano(s)?( de|convenio|assistencia(s)?)?) (odontologic(o|a)|saude|medic(o|a))/i, /(health|dental) (and dental )?(care|insurance|plan)/i],
  HOME_OFFICE_VOUCHER: [/(auxilio|subsidio|ajuda) (para )?(de custo )?(atuacao em )?(home( |-)office|trabalho remoto)/i, /remote work allowance/i],
  LIFE_INSURANCE: [/seguro de vida/i, /life insurance/i],
  MEAL_VOUCHER: [/(vale )?(alimentacao|refeicao)/i, /caju/i, /\bva\b/i, /\bvr\b/i, /(to use with|flex) food/i],
  PAID_VACATIONS: [/(descanso|feria(s)?|folga) (e feriado(s)?)?(anuais )?(remunerad(a|o)(s)?)?/i, /paid annual leave/i],
  PRIVATE_PENSION: [/previdencia privada/i],
  PSYCHOLOGICAL_HELP: [/(auxilio|apoio|suporte) (social e )?(psicologico|bem estar)/i, /mental health/i, /(apoio a|cuidado com|auxilio) saude (mental|emocional)/i],
  REFERRAL_BONUS: [/(bônus|programa de) (por )?indicacao/i, /program of indication/i, /indicacao premiada/i],
  STOCK_OPTIONS: [/stock options/i],
  TRANSPORTATION_VOUCHER: [/vale transporte/i, /\bvt\b/i, /auxilio combustivel/i],
  USD_SALARY: [/salary in usd/i],
}
enum JobBenefit {
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
const BENEFITS_RATING = {
  "ANUAL_BONUS": 1,
  "BIRTHDAY_DAYOFF": 1,
  "COURSE_HELP": 1,
  "FLEXIBLE_HOURS": 2,
  "GYMPASS": 2,
  "HEALTH_OR_DENTAL_PLAN": 2,
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
  PJ: [/\bpj\b/i, /pessoa juridica/i],
}
enum JobHiringRegime {
  PJ = "PJ",
  CLT = "CLT",
}

const TYPES_REGEX = {
  REMOTE: [/home office/i, /remoto/i, /trabalhar de casa/i, /remote/i, /remota/i],
  HYBRID: [/hibrido/i, /hybrid/i],
  FACE_TO_FACE: [/presencial/i],
}
enum JobType {
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  FACE_TO_FACE = "FACE_TO_FACE",
}

export const getSkillsBasedOnDescription = (job: { skills?: string[], description: string }): { skills: JobSkill[], description: string } => {
  const existentSkills = job.skills;
  const description = removeAccent(job.description);
  let newDescription = description;

  const skills: JobSkill[] = existentSkills?.length ? [...existentSkills as JobSkill[]] : [];

  for (const skill of Object.keys(SKILLS_REGEX)) {
    if (stringContainsAny(newDescription, SKILLS_REGEX?.[skill])) {
      skills.push(JobSkill?.[skill]);
      newDescription = addMarkdown(newDescription, SKILLS_REGEX?.[skill]);
    }
  }

  return { skills: uniq(skills)?.sort((a, b) => a.localeCompare(b)), description: newDescription };
}

export const getBenefitsBasedOnDescription = (job: { benefits?: string[], description: string }): { benefits: JobBenefit[], description: string } => {
  const existentBenefits = job.benefits;
  const description = removeAccent(job.description);
  let newDescription = description;

  const benefits: JobBenefit[] = existentBenefits?.length ? [...existentBenefits as JobBenefit[]] : [];

  for (const benefit of Object.keys(BENEFITS_REGEX)) {
    if (stringContainsAny(newDescription, BENEFITS_REGEX?.[benefit])) {
      benefits.push(JobBenefit?.[benefit]);
      newDescription = addMarkdown(newDescription, BENEFITS_REGEX?.[benefit]);
    }
  }

  return { benefits: uniq(benefits)?.sort((a, b) => a.localeCompare(b)), description: newDescription };
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
    case 'java': return JobSkill.JAVA;
    case 'javascript': return JobSkill.JAVASCRIPT;
    case 'mongodb': return JobSkill.DB;
    case 'nextjs': return JobSkill.NEXT;
    case 'node.js': return JobSkill.NODE;
    case 'javaScript': return JobSkill.JAVASCRIPT;
    case 'reactjs': return JobSkill.REACT;
    case 'react native': return JobSkill.REACT_NATIVE;
    case 'restful': return JobSkill.API;
    case 'sass': return JobSkill.SASS;
    case 'scrum': return JobSkill.AGILE;
    case 'sql': return JobSkill.DB;
    case 'styled - components': return JobSkill.STYLED_COMPONENTS;
    case 'typescript': return JobSkill.TYPESCRIPT;
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
  const description = removeAccent(job.description);

  if (stringContainsAny(description, HIRING_REGIMES_REGEX.CLT)) return JobHiringRegime.CLT;
  if (stringContainsAny(description, HIRING_REGIMES_REGEX.PJ)) return JobHiringRegime.PJ;

  return JobHiringRegime.PJ;
}

export const getTypeBasedOnDescription = (job: { description: string }): JobType => {
  const description = removeAccent(job.description);

  if (stringContainsAny(description, TYPES_REGEX.REMOTE)) return JobType.REMOTE;
  if (stringContainsAny(description, TYPES_REGEX.HYBRID)) return JobType.HYBRID;
  if (stringContainsAny(description, TYPES_REGEX.FACE_TO_FACE)) return JobType.FACE_TO_FACE;

  return JobType.REMOTE;
}