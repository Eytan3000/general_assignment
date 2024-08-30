import { useMutation } from '@tanstack/react-query';
import { createInDb } from '../API';

export const useCreate = () => {
  return useMutation({
    mutationFn: createInDb,
    // onSuccess: () => {
    //   setAlert('Saved!');
    // },
    // onError: () => {
    //   setAlert('There was a problem');
    // },
  });
};
