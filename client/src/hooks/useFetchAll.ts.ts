import { useQuery } from '@tanstack/react-query';
import { RecipeDataWithID } from '../types';
import { getAllFromDb } from '../API';

export const useFetchAll = () => {
  return useQuery<{
    message: RecipeDataWithID[];
    status: string;
  }>({
    queryKey: ['getAllFromDb'],
    queryFn: getAllFromDb,
  });
};
