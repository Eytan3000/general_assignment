import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFromDb } from '../API';

export const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFromDb,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllFromDb'] });
    },
  });
};
