import { Alert, Button } from '@mui/joy';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { FormEvent } from 'react';
import { RecipeData, SignInFormElement } from '../../types';

const nameLabel = 'Title';
const ingredientsLabel = 'ingredients';
const stepsLabel = 'Steps';
const buttonText = 'Save';

export default function DumbForm({
  handleSubmit,
  data,
  alert,
  isLoading,
}: {
  handleSubmit: (e: FormEvent<SignInFormElement>) => void;
  data: RecipeData;
  alert: string;
  isLoading: boolean;
}) {
  const steps = data.steps;
  const title = data.title;
  const ingredients = data.ingredients;

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
            <Input
              defaultValue={title}
              variant="outlined"
              type="text"
              name="title"
            />
          </FormControl>
          <FormControl required>
            <FormLabel>{ingredientsLabel}</FormLabel>
            <Input
              defaultValue={ingredients}
              type="text"
              name="ingredients"
              placeholder="Salt, Pepper, Garlic, Onion"
            />
          </FormControl>
          <FormControl required>
            <FormLabel>{stepsLabel}</FormLabel>
            <Input defaultValue={steps} type="text" name="steps" />
          </FormControl>

          <Button
            loading={isLoading}
            type="submit"
            sx={{ width: '100%', mt: 4 }}>
            {buttonText}
          </Button>
          {alert !== '' && <Alert>{alert}</Alert>}
        </form>
      </Stack>
    </>
  );
}
