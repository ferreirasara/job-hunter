import { message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';
import { JobPlatform } from '../@types/types';

export const useImportJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ platform, url }: { platform: JobPlatform, url: string }): Promise<number> => {
      const secretToken = localStorage?.getItem(LOCAL_STORAGE_SECRET_TOKEN_KEY);

      const response = await fetch(`${API_URL}/import-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: secretToken || '',
        },
        body: JSON.stringify({ platform, url }),
      });
      const responseJson = await response?.json();

      if (!response.ok) {
        throw new Error(responseJson?.message || 'Failed to import job');
      }

      return responseJson?.totalJobs;
    },
    onSuccess: (data) => {
      if (data > 0) {
        message.success('Vaga importada com sucesso');
      } else {
        message.info('A vaga não foi importada. Confira se a vaga já existe ou se os dados estão corretos.');
      }
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      message.error(`Falha ao importar a vaga: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  })
};
