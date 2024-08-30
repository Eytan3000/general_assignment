import {
  Box,
  Button,
  Input,
  Modal,
  ModalClose,
  Sheet,
  Typography,
} from '@mui/joy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteRecipes, getAllRecipes } from '../API';
import { RecipeDataWithID } from '../types';
import Loader from './Loader';
import Error from './Error';
import { useMemo, useState } from 'react';

import { useNavigate } from '@tanstack/react-router';
import DisplayCard from './DisplayCard';
import EditForm from './EditForm';

const initObject = {
  id: 0,
  steps: '',
  title: '',
  ingredients: '',
};

const allElementsTitle = 'All Recipes';

const sortByTitle = (array: RecipeDataWithID[]) => {
  const newArray = [...array]; // to avoide mutating original
  return newArray.sort((a, b) => a.title.localeCompare(b.title));
};
const filterByTitle = (array: RecipeDataWithID[], filter: string) => {
  return array.filter((el) => el.title.includes(filter));
};

export default function AllRecipes() {
  const [sort, setSort] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(initObject);
  const [filter, setFilter] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteRecipes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allRecipes'] });
    },
  });

  const { data, isLoading, isError } = useQuery<{
    message: RecipeDataWithID[];
    status: string;
  }>({
    queryKey: ['allRecipes'],
    queryFn: getAllRecipes,
  });

  const sortedData = useMemo(() => {
    if (sort) {
      return sortByTitle(data?.message || []);
    }
    return data?.message || [];
  }, [sort, data?.message]);

  const filteredData = useMemo(() => {
    return filterByTitle(sortedData, filter);
  }, [sortedData, filter]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  if (data) {
    function handleDelete(id: number) {
      mutation.mutate({ id });
    }

    return (
      <>
        <Box p={3} display="flex" flexDirection="column" gap={2}>
          <Button
            onClick={() => navigate({ to: '..' })}
            variant="plain"
            size="lg"
            sx={{ fontSize: '20px', mr: '100%' }}>
            {'<'}
          </Button>
          <Typography m={'auto'} level="h1">
            {allElementsTitle}
          </Typography>

          <Box display={'flex'} gap={10} mt="3rem">
            <Button
              onClick={() => setSort((prev) => !prev)}
              variant={sort ? 'solid' : 'outlined'}
              sx={{ width: '150px' }}>
              Sort by title
            </Button>
            <div>
              <Typography>Filter by string</Typography>
              <Input onChange={(e) => setFilter(e.target.value)} />
            </div>
          </Box>

          {filteredData.map((recipe) => (
            <DisplayCard
              key={recipe.id}
              data={recipe}
              setEditingData={setEditingData}
              setOpen={setOpen}
              handleDelete={handleDelete}
            />
          ))}
        </Box>

        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}>
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <EditForm setOpen={setOpen} data={editingData} />
          </Sheet>
        </Modal>
      </>
    );
  }
}
