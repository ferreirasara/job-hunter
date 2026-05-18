import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '../utils/utils';

export const useValidateSecretToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      const response = await fetch(`${API_URL}/validate`, {
        method: 'POST',
        headers: { Authorization: token },
      });
      const responseJson = await response?.json();
      return responseJson;
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  })
};
