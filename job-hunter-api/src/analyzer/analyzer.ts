import { uniq } from "lodash";
import { JobBenefit, JobHiringRegime, JobSeniority, JobSkill, JobType } from "../@types/types";
import { getNumberFromString, normalizeDescription, removeAccent, stringContainsAny } from "../utils/utils";
import { BENEFITS_RATING, SKILL_RATING } from "./ratings";
import { BENEFITS_REGEX, HIRING_REGIMES_REGEX, SENIORITY_REGEX, SKILLS_REGEX, TYPES_REGEX, YEARS_OF_EXPERIENCE_REGEX } from "./regex";

export const getSkillsBasedOnDescription = (job: { title: string, skills?: string[], description: string }): JobSkill[] => {
  const existentSkills = job.skills;
  const skills: JobSkill[] = existentSkills?.length ? [...existentSkills as JobSkill[]] : [];

  for (const skill of Object.keys(SKILLS_REGEX)) {
    if (stringContainsAny(job.title, SKILLS_REGEX?.[skill])) skills.push(JobSkill?.[skill]);
    if (stringContainsAny(job.description, SKILLS_REGEX?.[skill])) skills.push(JobSkill?.[skill]);
  }

  return uniq(skills)?.sort((a, b) => a.localeCompare(b));
}

export const getBenefitsBasedOnDescription = (job: { title: string, benefits?: string[], description: string }): JobBenefit[] => {
  const existentBenefits = job.benefits;
  const benefits: JobBenefit[] = existentBenefits?.length ? [...existentBenefits as JobBenefit[]] : [];

  for (const benefit of Object.keys(BENEFITS_REGEX)) {
    if (stringContainsAny(job.title, BENEFITS_REGEX?.[benefit])) benefits.push(JobBenefit?.[benefit]);
    if (stringContainsAny(job.description, BENEFITS_REGEX?.[benefit])) benefits.push(JobBenefit?.[benefit]);
  }

  return uniq(benefits)?.sort((a, b) => a.localeCompare(b));
}

export const getProgramathorNormalizedSkill = (skill: string): JobSkill | string => {
  const allSkills = Object.keys(JobSkill);
  if (allSkills?.includes(skill)) return skill;

  const lowerCaseSkill = skill?.toLowerCase();
  switch (lowerCaseSkill) {
    case '.net': return JobSkill.DOT_NET;
    case '.net core': return JobSkill.DOT_NET;
    case '.net mvc': return JobSkill.DOT_NET;
    case 'agilephp': return JobSkill.PHP;
    case 'angular': return JobSkill.ANGULAR;
    case 'apache': return JobSkill.DEV_OPS;
    case 'aws rds (relational database service)': return JobSkill.DEV_OPS;
    case 'aws s3': return JobSkill.DEV_OPS;
    case 'aws ec2 (elastic compute cloud)': return JobSkill.DEV_OPS;
    case 'azure': return JobSkill.DEV_OPS;
    case 'backbone.js': return JobSkill.BACKBONE;
    case 'bootstrap': return JobSkill.CSS;
    case 'c#': return JobSkill.CSHARP;
    case 'codeigniter': return JobSkill.PHP;
    case 'cloud': return JobSkill.DEV_OPS;
    case 'clean code': return JobSkill.GOOD_PRACTICES;
    case 'css': return JobSkill.CSS;
    case 'cypress.io': return JobSkill.TEST;
    case 'design pattern': return JobSkill.GOOD_PRACTICES;
    case 'devops': return JobSkill.DEV_OPS;
    case 'django': return JobSkill.DJANGO;
    case 'docker': return JobSkill.DEV_OPS;
    case 'elasticsearch': return JobSkill.ELASTIC_SEARCH;
    case 'es6': return JobSkill.JAVASCRIPT;
    case 'express': return JobSkill.API;
    case 'firebase': return JobSkill.DB;
    case 'flask': return JobSkill.FLASK;
    case 'flutter': return JobSkill.FLUTTER;
    case 'figma': return JobSkill.PROTOTYPING;
    case 'git': return JobSkill.CODE_VERSIONING;
    case 'go': return JobSkill.GOLANG;
    case 'google cloud': return JobSkill.DEV_OPS;
    case 'graphql': return JobSkill.API;
    case 'html': return JobSkill.HTML;
    case 'ionic': return JobSkill.IONIC;
    case 'java': return JobSkill.JAVA;
    case 'javaee': return JobSkill.JAVA;
    case 'javascript': return JobSkill.JAVASCRIPT;
    case 'javaScript': return JobSkill.JAVASCRIPT;
    case 'jest': return JobSkill.TEST;
    case 'jquery': return JobSkill.JQUERY;
    case 'junit': return JobSkill.JAVA;
    case 'kubernetes': return JobSkill.DEV_OPS;
    case 'laravel': return JobSkill.PHP;
    case 'lean': return JobSkill.LEAN;
    case 'magento': return JobSkill.MAGENTO;
    case 'mongodb': return JobSkill.DB;
    case 'mysql': return JobSkill.DB;
    case 'nestjs': return JobSkill.NEST;
    case 'nextjs': return JobSkill.NEXT;
    case 'nosql': return JobSkill.DB;
    case 'node.js': return JobSkill.NODE;
    case 'phpunit': return JobSkill.PHP;
    case 'postgresql': return JobSkill.DB;
    case 'oracle': return JobSkill.DEV_OPS;
    case 'objective-c': return JobSkill.OBJECTIVE_C;
    case 'qa - quality assurance': return JobSkill.TEST;
    case 'python': return JobSkill.PYTHON;
    case 'reactjs': return JobSkill.REACT;
    case 'react native': return JobSkill.REACT_NATIVE;
    case 'realbasic': return JobSkill.BASIC;
    case 'redux': return JobSkill.STATE_MANAGEMENT;
    case 'restful': return JobSkill.API;
    case 'ruby': return JobSkill.RUBY;
    case 'ruby on rails': return JobSkill.RUBY;
    case 'rust': return JobSkill.RUST;
    case 'sas': return JobSkill.SAS;
    case 'sass': return JobSkill.SASS;
    case 'scrum': return JobSkill.AGILE;
    case 'scss': return JobSkill.CSS;
    case 'server': return JobSkill.API;
    case 'spring boot': return JobSkill.JAVA;
    case 'sql': return JobSkill.DB;
    case 'sql server': return JobSkill.DB;
    case 'styled - components': return JobSkill.STYLED_COMPONENTS;
    case 'styled-components': return JobSkill.STYLED_COMPONENTS;
    case 'tdd': return JobSkill.TEST;
    case 'testes automatizados': return JobSkill.TEST;
    case 'testes de regressão': return JobSkill.TEST;
    case 'testes funcionais': return JobSkill.TEST;
    case 'typescript': return JobSkill.TYPESCRIPT;
    case 'unity': return JobSkill.GAME_ENGINE;
    case 'vue.js': return JobSkill.VUE;
    case 'yii': return JobSkill.PHP;
    case 'wordpress': return JobSkill.WORDPRESS;
    case 'zend': return JobSkill.PHP;

    default: {
      console.log(`[getProgramathorNormalizedSkill] Skill not founded: ${lowerCaseSkill}`)
      return lowerCaseSkill?.toUpperCase();
    }
  }
}

export const getRatingsBasedOnSkillsAndBenefits = (job: { skills?: string[], benefits?: string[] }): { skillsRating: number, benefitsRating: number } => {
  let skillsRating = 0;
  let benefitsRating = 0;

  for (const skill of job.skills) skillsRating += SKILL_RATING?.[skill];
  for (const benefit of job.benefits) benefitsRating += BENEFITS_RATING?.[benefit];

  return {
    skillsRating: skillsRating || 0,
    benefitsRating: benefitsRating || 0,
  };
}

export const getHiringRegimeBasedOnDescription = (job: { title: string, description: string }): JobHiringRegime => {
  if (stringContainsAny(job.title, HIRING_REGIMES_REGEX.CLT)) return JobHiringRegime.CLT;
  if (stringContainsAny(job.title, HIRING_REGIMES_REGEX.PJ)) return JobHiringRegime.PJ;
  if (stringContainsAny(job.description, HIRING_REGIMES_REGEX.CLT)) return JobHiringRegime.CLT;
  if (stringContainsAny(job.description, HIRING_REGIMES_REGEX.PJ)) return JobHiringRegime.PJ;

  return JobHiringRegime.PJ;
}

export const getTypeBasedOnDescription = (job: { title: string, description: string }): JobType => {
  const isRemoteTitle = stringContainsAny(job.title, TYPES_REGEX.REMOTE);
  const isHybridTitle = stringContainsAny(job.title, TYPES_REGEX.HYBRID);
  const isFaceToFaceTitle = stringContainsAny(job.title, TYPES_REGEX.FACE_TO_FACE);

  const isRemoteDescription = stringContainsAny(job.description, TYPES_REGEX.REMOTE);
  const isHybridDescription = stringContainsAny(job.description, TYPES_REGEX.HYBRID);
  const isFaceToFaceDescription = stringContainsAny(job.description, TYPES_REGEX.FACE_TO_FACE);

  if (isRemoteTitle && (!isHybridTitle || !isFaceToFaceTitle)) return JobType.REMOTE;
  if (isHybridTitle) return JobType.HYBRID;
  if (isFaceToFaceTitle) return JobType.FACE_TO_FACE;
  if (isRemoteDescription && (!isHybridDescription || !isFaceToFaceDescription)) return JobType.REMOTE;
  if (isHybridDescription) return JobType.HYBRID;
  if (isFaceToFaceDescription) return JobType.FACE_TO_FACE;

  return JobType.REMOTE;
}

export const getSeniorityBasedOnDescription = (job: { title: string, description: string }): JobSeniority => {
  if (stringContainsAny(job.title, SENIORITY_REGEX.JUNIOR)) return JobSeniority.JUNIOR;
  if (stringContainsAny(job.title, SENIORITY_REGEX.MID_LEVEL)) return JobSeniority.MID_LEVEL;
  if (stringContainsAny(job.title, SENIORITY_REGEX.SENIOR)) return JobSeniority.SENIOR;
  if (stringContainsAny(job.description, SENIORITY_REGEX.JUNIOR)) return JobSeniority.JUNIOR;
  if (stringContainsAny(job.description, SENIORITY_REGEX.MID_LEVEL)) return JobSeniority.MID_LEVEL;
  if (stringContainsAny(job.description, SENIORITY_REGEX.SENIOR)) return JobSeniority.SENIOR;

  return JobSeniority.SENIOR;
}

export const getYearOfExperienceBasedOnDescription = (job: { description: string }): number => {
  for (const regex of YEARS_OF_EXPERIENCE_REGEX) {
    const res = regex.exec(job.description);
    if (res) {
      const yearsStr = res?.[0]?.replace(/[^0-9]/g, ' ')?.trim();
      const yearsSplit = yearsStr?.split(' ')?.filter(cur => !!cur);
      if (!yearsSplit.length) return null;
      const years = parseInt(yearsSplit?.[0]);
      if (years < 10) return years;
      if (!years) return getNumberFromString(res?.[0]);
    }
  }
  return null;
}

export const analyzeDescription = (job: { title: string, description: string, skills?: string[], benefits?: string[] }) => {
  const oldSkills = job.skills;
  const oldBenefits = job.benefits;
  const description = normalizeDescription(job.description);
  const title = removeAccent(job.title);

  let skills = getSkillsBasedOnDescription({ title, description, skills: oldSkills });
  skills = skills?.filter(cur => !!cur);

  let benefits = getBenefitsBasedOnDescription({ title, description, benefits: oldBenefits });
  benefits = benefits?.filter(cur => !!cur);

  const type = getTypeBasedOnDescription({ title, description });
  const hiringRegime = getHiringRegimeBasedOnDescription({ title, description });
  const seniority = getSeniorityBasedOnDescription({ title, description });
  const yearsOfExperience = getYearOfExperienceBasedOnDescription({ description });

  const { skillsRating, benefitsRating } = getRatingsBasedOnSkillsAndBenefits({ skills, benefits });

  return {
    skills, benefits,
    skillsRating, benefitsRating,
    type,
    hiringRegime,
    seniority,
    yearsOfExperience,
    description: description?.replace(/\n+/g, '\n')
  };
}
