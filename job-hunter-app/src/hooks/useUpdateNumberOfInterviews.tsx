import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';
import { message } from 'antd';

export const useUpdateNumberOfInterviews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ numberOfInterviews, uuid }: { uuid: string, numberOfInterviews: number }) => {
      const secretToken = localStorage?.getItem(LOCAL_STORAGE_SECRET_TOKEN_KEY);

      const response = await fetch(`${API_URL}/job/` + uuid + '/number-of-interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: secretToken || '',
        },
        body: JSON.stringify({ numberOfInterviews }),
      });

      const responseJson = await response?.json();

      if (!response.ok) {
        throw new Error(responseJson?.message || 'Unknown error');
      }

      return responseJson;
    },
    onSuccess: () => {
      message.success(`Número de entrevistas atualizado com sucesso`);
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (error) => {
      message.error(`Erro ao atualizar o número de entrevistas: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  })
};
