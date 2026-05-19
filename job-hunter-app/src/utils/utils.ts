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
