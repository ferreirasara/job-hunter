import { uniq } from "lodash";
import JobOpportunityController from "../controllers/JobOpportunity.controller";
import { stringContainsAny } from "../utils/utils";

const SKILLS = {
  ANGULAR: [/angular/i],
  AJAX: [/ajax/i],
  API: [/rest api/i, /apis restful/i, /api restful/i, /api/i, /apis rest/i, /soap/i, /graphql/],
  CODE_MAINTAINABILITY: [/eslint/i, /prettier/i],
  CSHARP: [/c#/i],
  CSS: [/css/i, /scss/i, /css3/i],
  DB: [/banco de dados/i, /mongodb/i, /sql/i, /sql server/i, /postgres/i, /mysql/i, /firebase/i, /redis/i],
  DEV_OPS: [/docker/i, /aws/i, /kubernetes/i, /terraform/i, /azure/i, /jenkins/i, /ci\/cd/i, /ci-cd/i, /cloud/i],
  DOT_NET: [/.net/i],
  ECOMMERCE: [/shopfy/i, /linx/i, /traycorp/i, /tray/i],
  ENGLISH: [/ingles/i, /english/i],
  FIGMA: [/figma/i],
  FLUTTER: [/flutter/i],
  CODE_VERSIONING: [/git/i, /gitlab/i, /git lab/i, /github/i, /bitbucket/i, /svn/i, /controle de versionamento/i],
  HTML: [/html/i, /html5/i],
  IONIC: [/ionic/i],
  JAVA: [/java/i],
  JAVASCRIPT: [/javascript/i, /java script/i, /js/i, /es6/i],
  JQUERY: [/jquery/i],
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
  TEST: [/jest/i, /cypress/i, /tdd/i, /e2e/i, /testes unitarios/i],
  TYPESCRIPT: [/typescript/i, /type script/i, /ts/i],
  VANILLA: [/javascript vanilla/i, /vanilla/i, /vanillajs/i, /vanilla js/i],
  VUE: [/vue/i, /vue.js/i, /vuejs/i, /vue js/i],
  WEB_HOOKS: [/webhooks/i, /web hooks/i],
  WORDPRESS: [/wordpress/i],
}

enum JobSkills {
  ANGULAR = "ANGULAR",
  AJAX = "AJAX",
  API = "API",
  CODE_MAINTAINABILITY = "CODE_MAINTAINABILITY",
  CSHARP = "CSHARP",
  CSS = "CSS",
  DB = "DB",
  DEV_OPS = "DEV_OPS",
  DOT_NET = "DOT_NET",
  ECOMMERCE = "ECOMMERCE",
  ENGLISH = "ENGLISH",
  FIGMA = "FIGMA",
  FLUTTER = "FLUTTER",
  CODE_VERSIONING = "CODE_VERSIONING",
  HTML = "HTML",
  IONIC = "IONIC",
  JAVA = "JAVA",
  JAVASCRIPT = "JAVASCRIPT",
  JQUERY = "JQUERY",
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

export const getSkillsBasedOnDescription = (job: { uuid: string, skills: string, description: string }) => {
  const existentSkills = job.skills?.split(',');
  const description = job.description;

  const skills: JobSkills[] = existentSkills?.length ? [...existentSkills as JobSkills[]] : [];

  if (stringContainsAny(description, SKILLS.API)) skills.push(JobSkills.API);
  if (stringContainsAny(description, SKILLS.ANGULAR)) skills.push(JobSkills.ANGULAR)
  if (stringContainsAny(description, SKILLS.AJAX)) skills.push(JobSkills.AJAX)
  if (stringContainsAny(description, SKILLS.API)) skills.push(JobSkills.API)
  if (stringContainsAny(description, SKILLS.CODE_MAINTAINABILITY)) skills.push(JobSkills.CODE_MAINTAINABILITY)
  if (stringContainsAny(description, SKILLS.CSHARP)) skills.push(JobSkills.CSHARP)
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

export const normalizeProgramathorSkills = async () => {
  const programathorJobs = await JobOpportunityController.getJobs({ platform: "PROGRAMATHOR" });
  for (const job of programathorJobs) {
    const existentSkills = job.skills?.split(',');
    const newSkills = existentSkills?.map(cur => getNormalizedSkill(cur));
    await JobOpportunityController.updateSkills(job.uuid, newSkills?.join(','))
  }
}

export const getNormalizedSkill = (skill: string) => {
  switch (skill) {

    case 'Docker': return JobSkills.DEV_OPS;
    case 'Git': return JobSkills.CODE_VERSIONING;
    case 'ReactJS': return JobSkills.REACT;
    case 'React Native': return JobSkills.REACT_NATIVE;
    case 'HTML': return JobSkills.HTML;
    case 'CSS': return JobSkills.CSS;
    case 'Sass': return JobSkills.SASS;
    case 'JavaScript': return JobSkills.JAVASCRIPT;
    case 'Vue.js': return JobSkills.VUE;
    case 'NextJS': return JobSkills.NEXT;
    case 'Node.js': return JobSkills.NODE;
    // case 'SCRUM': return JobSkills.SCRUM;
    case 'TypeScript': return JobSkills.TYPESCRIPT;
    case 'Java': return JobSkills.JAVA;
    // case 'Less': return JobSkills.LESS;
    case 'WordPress': return JobSkills.WORDPRESS;
    case 'RESTful': return JobSkills.API;
    case 'Flutter': return JobSkills.FLUTTER;
    case 'Styled - Components': return JobSkills.STYLED_COMPONENTS;
    case 'Ionic': return JobSkills.IONIC;
    case 'Angular': return JobSkills.ANGULAR;
    case 'Google Cloud': return JobSkills.DEV_OPS;
    case 'MongoDB': return JobSkills.DB;
    // case 'JSON': return JobSkills.JSON;
    case 'SQL': return JobSkills.DB;

    default: return skill?.toUpperCase();
  }
}