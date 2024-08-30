import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInDb } from '../API';

export const useUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInDb,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllFromDb'] });
    },
  });
};
