import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';
import message from 'antd/es/message';

export const useUpdateUnwanted = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uuid, unwanted }: { uuid: string, unwanted: boolean }) => {
      const secretToken = localStorage?.getItem(LOCAL_STORAGE_SECRET_TOKEN_KEY);

      const response = await fetch(`${API_URL}/job/` + uuid + '/unwanted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: secretToken || '',
        },
        body: JSON.stringify({ unwanted }),
      });
      const responseJson = await response?.json();

      if (!response.ok) {
        throw new Error(responseJson?.message || 'Unknown error');
      }

      return responseJson;
    },
    onSuccess: () => {
      message.success(`Status de indesejado atualizado com sucesso`);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      message.error(`Erro ao atualizar o status de indesejado: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  })
};
