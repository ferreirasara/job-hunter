import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';
import message from 'antd/es/message';

export const useUpdateRecused = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, recused }: { uuid: string, recused: boolean }) => {
      const secretToken = localStorage?.getItem(LOCAL_STORAGE_SECRET_TOKEN_KEY);

      const response = await fetch(`${API_URL}/job/` + uuid + '/recused', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: secretToken || '',
        },
        body: JSON.stringify({ recused }),
      });
      const responseJson = await response?.json();

      if (!response.ok) {
        throw new Error(responseJson?.message || 'Unknown error');
      }

      return responseJson;
    },
    onSuccess: () => {
      message.success(`Status de recusado atualizado com sucesso`);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      message.error(`Erro ao atualizar o status de recusado: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  })
};
