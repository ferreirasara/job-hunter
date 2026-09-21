import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';
import message from 'antd/es/message';

export const useUpdateApplied = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, applied }: { uuid: string, applied: boolean }) => {
      const secretToken = localStorage?.getItem(LOCAL_STORAGE_SECRET_TOKEN_KEY);

      const response = await fetch(`${API_URL}/job/` + uuid + '/applied', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: secretToken || '',
        },
        body: JSON.stringify({ applied }),
      });
      const responseJson = await response?.json();

      if (!response.ok) {
        throw new Error(responseJson?.message || 'Unknown error');
      }

      return responseJson;
    },
    onSuccess: () => {
      message.success(`Status de candidatura atualizado com sucesso`);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      message.error(`Erro ao atualizar o status de candidatura: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  })
};
