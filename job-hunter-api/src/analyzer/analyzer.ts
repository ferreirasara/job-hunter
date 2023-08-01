import { uniq } from "lodash";
import { addMarkdown, normalizeDescription, removeAccent, stringContainsAny } from "../utils/utils";
import { BENEFITS_REGEX, HIRING_REGIMES_REGEX, SENIORITY_REGEX, SKILLS_REGEX, TYPES_REGEX, YEARS_OF_EXPERIENCE_REGEX } from "./regex";
import { BENEFITS_RATING, SKILL_RATING } from "./ratings";
import { JobBenefit, JobHiringRegime, JobSeniority, JobSkill, JobType } from "../@types/types";

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
    case 'angular': return JobSkill.ANGULAR;
    case 'aws s3': return JobSkill.DEV_OPS;
    case 'bootstrap': return JobSkill.CSS;
    case 'c#': return JobSkill.CSHARP;
    case 'css': return JobSkill.CSS;
    case 'django': return JobSkill.DJANGO;
    case 'docker': return JobSkill.DEV_OPS;
    case 'express': return JobSkill.API;
    case 'flask': return JobSkill.FLASK;
    case 'flutter': return JobSkill.FLUTTER;
    case 'git': return JobSkill.CODE_VERSIONING;
    case 'google cloud': return JobSkill.DEV_OPS;
    case 'graphql': return JobSkill.API;
    case 'html': return JobSkill.HTML;
    case 'ionic': return JobSkill.IONIC;
    case 'java': return JobSkill.JAVA;
    case 'javascript': return JobSkill.JAVASCRIPT;
    case 'javaScript': return JobSkill.JAVASCRIPT;
    case 'jquery': return JobSkill.JQUERY;
    case 'laravel': return JobSkill.PHP;
    case 'mongodb': return JobSkill.DB;
    case 'mysql': return JobSkill.DB;
    case 'nextjs': return JobSkill.NEXT;
    case 'node.js': return JobSkill.NODE;
    case 'postgresql': return JobSkill.DB;
    case 'python': return JobSkill.PYTHON;
    case 'reactjs': return JobSkill.REACT;
    case 'react native': return JobSkill.REACT_NATIVE;
    case 'restful': return JobSkill.API;
    case 'sass': return JobSkill.SASS;
    case 'scrum': return JobSkill.AGILE;
    case 'spring boot': return JobSkill.JAVA;
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

export const getHiringRegimeBasedOnDescription = (job: { title: string, description: string }): JobHiringRegime => {
  if (stringContainsAny(job.title, HIRING_REGIMES_REGEX.CLT)) return JobHiringRegime.CLT;
  if (stringContainsAny(job.title, HIRING_REGIMES_REGEX.PJ)) return JobHiringRegime.PJ;
  if (stringContainsAny(job.description, HIRING_REGIMES_REGEX.CLT)) return JobHiringRegime.CLT;
  if (stringContainsAny(job.description, HIRING_REGIMES_REGEX.PJ)) return JobHiringRegime.PJ;

  return JobHiringRegime.PJ;
}

export const getTypeBasedOnDescription = (job: { title: string, description: string }): JobType => {
  if (stringContainsAny(job.title, TYPES_REGEX.REMOTE)) return JobType.REMOTE;
  if (stringContainsAny(job.title, TYPES_REGEX.HYBRID)) return JobType.HYBRID;
  if (stringContainsAny(job.title, TYPES_REGEX.FACE_TO_FACE)) return JobType.FACE_TO_FACE;
  if (stringContainsAny(job.description, TYPES_REGEX.REMOTE)) return JobType.REMOTE;
  if (stringContainsAny(job.description, TYPES_REGEX.HYBRID)) return JobType.HYBRID;
  if (stringContainsAny(job.description, TYPES_REGEX.FACE_TO_FACE)) return JobType.FACE_TO_FACE;

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

export const getYearOfExperienceBasedOnDescription = async (job: { description: string }): Promise<number> => {
  for (const regex of YEARS_OF_EXPERIENCE_REGEX) {
    const res = regex.exec(job.description);
    if (res) {
      const yearsStr = res?.[0]?.replace(/[^0-9]/g, '');
      const years = parseInt(yearsStr);
      if (years < 10) return years;
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

  let newDescription = description;

  for (const skill of skills) newDescription = addMarkdown(newDescription, SKILLS_REGEX?.[skill]);
  for (const benefit of benefits) newDescription = addMarkdown(newDescription, BENEFITS_REGEX?.[benefit]);
  newDescription = addMarkdown(newDescription, TYPES_REGEX?.[type]);
  newDescription = addMarkdown(newDescription, HIRING_REGIMES_REGEX?.[hiringRegime]);
  newDescription = addMarkdown(newDescription, SENIORITY_REGEX?.[seniority]);
  newDescription = addMarkdown(newDescription, YEARS_OF_EXPERIENCE_REGEX);

  return {
    skills, benefits,
    skillsRating, benefitsRating,
    type,
    hiringRegime,
    seniority,
    yearsOfExperience,
    description: newDescription?.replace(/\n+/g, '\n')?.replace(/`+/g, '`')
  };
}