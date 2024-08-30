import { Alert, Button } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { useMutation } from '@tanstack/react-query';
import { createRecipe } from '../API';
import { useState } from 'react';
import DOMPurify from 'dompurify';

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  ingredients: HTMLInputElement;
  steps: HTMLInputElement;
}
export interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const nameLabel = 'Title';
const ingredientsLabel = 'ingredients';
const stepsLabel = 'Steps';
const buttonText = 'Save';

export default function Form() {
  const [alert, setAlert] = useState('');

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

    const data = {
      title: DOMPurify.sanitize(formElements.title.value), // Sanitize against XSS
      ingredients: DOMPurify.sanitize(formElements.ingredients.value),
      steps: DOMPurify.sanitize(formElements.steps.value),
    };

    formElements.title.value = '';
    formElements.ingredients.value = '';
    formElements.steps.value = '';

    mutation.mutate(data);
  }

  return (
    <>
      <Stack
        gap={2}
        sx={{
          width: '20rem',
          border: '0.5px solid #bababa',
          pt: 4,
          px: 5,
          pb: 5,
          borderRadius: '10px',
        }}>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          onSubmit={handleSubmit}>
          <FormControl required>
            <FormLabel>{nameLabel}</FormLabel>
            <Input variant="outlined" type="text" name="title" />
          </FormControl>
          <FormControl required>
            <FormLabel>{ingredientsLabel}</FormLabel>
            <Input
              type="text"
              name="ingredients"
              placeholder="Salt, Pepper, Garlic, Onion"
            />
          </FormControl>
          <FormControl required>
            <FormLabel>{stepsLabel}</FormLabel>
            <Input type="text" name="steps" />
          </FormControl>

          <Button type="submit" sx={{ width: '100%', mt: 4 }}>
            {buttonText}
          </Button>
          {alert !== '' && <Alert>{alert}</Alert>}
        </form>
      </Stack>
    </>
  );
}
