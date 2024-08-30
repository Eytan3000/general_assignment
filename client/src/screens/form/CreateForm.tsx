import DOMPurify from 'dompurify';
import DumbForm from './DumbForm';
import { SignInFormElement } from '../../types';
import { useCreate } from '../../hooks/useCreate';

export default function CreateForm() {
  let alert = '';

  const data = {
    title: '',
    ingredients: '',
    steps: '',
  };

  const mutation = useCreate();

  if (mutation.isError) {
    alert = 'Error: ' + mutation.error.message;
  }
  if (mutation.isSuccess) {
    alert = 'Saved!';
  }

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
