import { useQuery } from '@tanstack/react-query'
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';
import { StatsResponse } from '../@types/types';

export const useGetStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async (): Promise<StatsResponse> => {

      const secretToken = localStorage?.getItem(LOCAL_STORAGE_SECRET_TOKEN_KEY);
      const response = await fetch(encodeURI(`${API_URL}/stats`), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: secretToken || '',
        },
      });
      const responseJson = await response?.json();
      return responseJson;
    },
  })
}
