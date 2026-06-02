import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';

export const useRunScrapers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const secretToken = localStorage?.getItem(LOCAL_STORAGE_SECRET_TOKEN_KEY);

      const response = await fetch(`${API_URL}/run-scrapers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: secretToken || '',
        },
      });
      const responseJson = await response?.json();
      return responseJson;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  })
};
