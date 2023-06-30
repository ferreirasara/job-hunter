import { uniq } from "lodash";
import { addMarkdown, removeAccent, stringContainsAny } from "../utils/utils";
import { BENEFITS_REGEX, HIRING_REGIMES_REGEX, SKILLS_REGEX, TYPES_REGEX } from "./regex";
import { BENEFITS_RATING, SKILL_RATING } from "./ratings";
import { JobBenefit, JobHiringRegime, JobSkill, JobType } from "../@types/types";

export const getSkillsBasedOnDescription = (job: { skills?: string[], description: string }): JobSkill[] => {
  const existentSkills = job.skills;
  const skills: JobSkill[] = existentSkills?.length ? [...existentSkills as JobSkill[]] : [];

  for (const skill of Object.keys(SKILLS_REGEX)) {
    if (stringContainsAny(job.description, SKILLS_REGEX?.[skill])) skills.push(JobSkill?.[skill]);
  }

  return uniq(skills)?.sort((a, b) => a.localeCompare(b));
}

export const getBenefitsBasedOnDescription = (job: { benefits?: string[], description: string }): JobBenefit[] => {
  const existentBenefits = job.benefits;
  const benefits: JobBenefit[] = existentBenefits?.length ? [...existentBenefits as JobBenefit[]] : [];

  for (const benefit of Object.keys(BENEFITS_REGEX)) {
    if (stringContainsAny(job.description, BENEFITS_REGEX?.[benefit])) benefits.push(JobBenefit?.[benefit]);
  }

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
    case 'styled - components': return JobSkill.STYLED_COMPONENTS;
    case 'testes automatizados': return JobSkill.TEST;
    case 'testes de regressão': return JobSkill.TEST;
    case 'testes funcionais': return JobSkill.TEST;
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

  for (const skill of job.skills) skillsRating += SKILL_RATING?.[skill];
  for (const benefit of job.benefits) benefitsRating += BENEFITS_RATING?.[benefit];

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

export const analyzeDescription = (job: { description: string, skills?: string[], benefits?: string[] }) => {
  const oldSkills = job.skills;
  const oldBenefits = job.benefits;
  const description = removeAccent(job.description)?.replace(/\`/ig, "")?.replace(/ /ig, ' ');

  const skills = getSkillsBasedOnDescription({ description, skills: oldSkills });
  const benefits = getBenefitsBasedOnDescription({ description, benefits: oldBenefits });
  const type = getTypeBasedOnDescription({ description });
  const hiringRegime = getHiringRegimeBasedOnDescription({ description });
  const { skillsRating, benefitsRating } = getRatingsBasedOnSkillsAndBenefits({ skills, benefits });

  let newDescription = description;

  for (const skill of skills) {
    newDescription = addMarkdown(newDescription, SKILLS_REGEX?.[skill]);
  }

  for (const benefit of benefits) {
    newDescription = addMarkdown(newDescription, BENEFITS_REGEX?.[benefit]);
  }
  newDescription = addMarkdown(newDescription, TYPES_REGEX?.[type]);
  newDescription = addMarkdown(newDescription, HIRING_REGIMES_REGEX?.[hiringRegime]);

  newDescription = newDescription?.replace(/\`+/ig, '\`');

  return { skills, benefits, skillsRating, benefitsRating, type, hiringRegime, description: newDescription.replace(/\n+/g, '\n') };
}