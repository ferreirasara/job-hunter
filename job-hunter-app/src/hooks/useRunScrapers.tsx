import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';
import message from 'antd/es/message';

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

      if (!response.ok) {
        throw new Error(responseJson?.message || 'Failed to run scrapers');
      }

      return responseJson;
    },
    onSuccess: () => {
      message.success('Scrapers executados com sucesso. Aguarde alguns minutos');
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      message.error(`Falha ao executar os scrapers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  })
};
