import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';
import message from 'antd/es/message';

export const useUpdateNumberOfTests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ numberOfTests, uuid }: { uuid: string, numberOfTests: number }) => {
      const secretToken = localStorage?.getItem(LOCAL_STORAGE_SECRET_TOKEN_KEY);

      const response = await fetch(`${API_URL}/job/` + uuid + '/number-of-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: secretToken || '',
        },
        body: JSON.stringify({ numberOfTests }),
      });
      const responseJson = await response?.json();

      if (!response.ok) {
        throw new Error(responseJson?.message || 'Unknown error');
      }

      return responseJson;
    },
    onSuccess: () => {
      message.success(`Número de testes atualizado com sucesso`);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      message.error(`Erro ao atualizar o número de testes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  })
};
