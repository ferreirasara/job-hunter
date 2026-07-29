import { BENEFITS_RATING, SKILL_RATING } from '../components/MultipleTags';

export const API_URL = import.meta.env.VITE_APP_API_BASE_URL;
export const LOCAL_STORAGE_SECRET_TOKEN_KEY = 'secret_token';

export const formatDateHour = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj?.toLocaleString('pt-br', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calcLimit = () => {
  const height = window.innerHeight;
  return Math.floor((height - 213) / 43);
}

export const getTagColor = (tag: string, skillRating?: number, benefitRating?: number) => {
  if (skillRating !== undefined) {
    if (skillRating <= -4) return 'red';
    if (skillRating === -3) return 'volcano';
    if (skillRating <= -1) return 'orange';
    if (skillRating === 0) return 'gold';
    if (skillRating <= 2) return 'lime';
    if (skillRating === 3) return 'green';
    if (skillRating === 4) return 'cyan';
    if (skillRating === 5) return 'geekblue';
  }

  if (benefitRating !== undefined) {
    if (benefitRating === 1) return 'blue';
    if (benefitRating === 2) return 'purple';
  }

  if (tag === 'CLT') return 'green';
  if (tag === 'PJ') return 'red';

  if (tag === 'REMOTE') return 'green';
  if (tag === 'HYBRID') return 'red';
  if (tag === 'FACE_TO_FACE') return 'red';

  if (tag === 'JUNIOR') return 'red';
  if (tag === 'MID_LEVEL') return 'green';
  if (tag === 'SENIOR') return 'green';

  return 'default';
};

export const getSkillRating = (skill: string | keyof typeof SKILL_RATING) => {
  return SKILL_RATING?.[skill as keyof typeof SKILL_RATING];
}

export const getBenefitRating = (benefit: string | keyof typeof BENEFITS_RATING) => {
  return BENEFITS_RATING?.[benefit as keyof typeof BENEFITS_RATING];
}
