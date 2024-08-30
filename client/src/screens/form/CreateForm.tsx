import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import DumbForm from './DumbForm';
import { SignInFormElement } from '../../types';
import { createRecipe } from '../../API';

export default function CreateForm() {
  const [alert, setAlert] = useState('');

  const data = {
    title: '',
    ingredients: '',
    steps: '',
  };

  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      setAlert('Saved!');
    },
    onError: () => {
      setAlert('There was a problem');
    },
  });

  function handleSubmit(event: React.FormEvent<SignInFormElement>) {
    event.preventDefault();

    const formElements = event.currentTarget.elements;

    // Sanitize
    data.title = DOMPurify.sanitize(formElements.title.value);
    data.ingredients = DOMPurify.sanitize(formElements.ingredients.value);
    data.steps = DOMPurify.sanitize(formElements.steps.value);

    formElements.title.value = '';
    formElements.ingredients.value = '';
    formElements.steps.value = '';

    mutation.mutate(data);
  }
  return <DumbForm handleSubmit={handleSubmit} alert={alert} data={data} />;
}
