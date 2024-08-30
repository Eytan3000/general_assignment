import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FormEvent, SetStateAction, useState } from 'react';
import DumbForm from './DumbForm';

import DOMPurify from 'dompurify';
import { RecipeData, SignInFormElement } from '../../types';
import { updateRecipe } from '../../API';

export default function EditForm({
  data,
  setOpen,
}: {
  data: RecipeData & { id: number };
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState('');

  const mutation = useMutation({
    mutationFn: updateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allRecipes'] });
      setOpen(false);
    },
    onError: () => {
      setAlert('There was a problem');
    },
  });

  function handleSubmit(event: FormEvent<SignInFormElement>) {
    event.preventDefault();

    const formElements = event.currentTarget.elements;
    data.title = DOMPurify.sanitize(formElements.title.value);
    data.ingredients = DOMPurify.sanitize(formElements.ingredients.value);
    data.steps = DOMPurify.sanitize(formElements.steps.value);

    mutation.mutate(data);
  }

  return <DumbForm handleSubmit={handleSubmit} alert={alert} data={data} />;
}
