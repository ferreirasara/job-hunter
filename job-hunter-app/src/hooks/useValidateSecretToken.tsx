import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../utils/utils';
import message from 'antd/es/message';

export const useValidateSecretToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      const response = await fetch(`${API_URL}/validate`, {
        method: 'POST',
        headers: { Authorization: token },
      });
      const responseJson = await response?.json();

      if (!response.ok) {
        throw new Error(responseJson?.message || 'Failed to validate secret token');
      }

      return responseJson;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      message.error(`Falha ao validar o token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  })
};
