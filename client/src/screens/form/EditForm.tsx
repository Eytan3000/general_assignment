import { FormEvent, SetStateAction } from 'react';
import DumbForm from './DumbForm';
import DOMPurify from 'dompurify';
import { RecipeData, SignInFormElement } from '../../types';
import { useUpdate } from '../../hooks/useUpdate';

export default function EditForm({
  data,
  setOpen,
}: {
  data: RecipeData & { id: number };
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  let alert = '';
  const mutation = useUpdate();

  if (mutation.isError) {
    alert = 'Error: ' + mutation.error.message;
  }
  if (mutation.isSuccess) {
    alert = 'Saved!';
    setOpen(false);
  }

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
