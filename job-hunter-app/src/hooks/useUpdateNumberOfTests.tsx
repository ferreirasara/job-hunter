import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL, LOCAL_STORAGE_SECRET_TOKEN_KEY } from '../utils/utils';

export const useUpdateNumberOfTests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ numberOfTests, uuid }: { uuid: string, numberOfTests: number }) => {
      const secretToken = localStorage?.getItem(LOCAL_STORAGE_SECRET_TOKEN_KEY);

      const response = await fetch(`${API_URL}/job/` + uuid, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: secretToken || '',
        },
        body: JSON.stringify({ numberOfTests }),
      });
      const responseJson = await response?.json();
      return responseJson;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  })
};
