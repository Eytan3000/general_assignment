export interface RecipeData {
  // id: number;
  title: string;
  steps: string;
  ingredients: string;
}
export type RecipeDataWithID = RecipeData & {
  id: number;
};

interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  ingredients: HTMLInputElement;
  steps: HTMLInputElement;
}
export interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
