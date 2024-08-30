import axios from 'axios';
import { RecipeData, RecipeDataWithID } from './types';

const API_URL = 'http://localhost:8000/recipes';

export const getAllFromDb = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const deleteFromDb = async ({ id }: { id: number }) => {
  const response = await axios.delete(API_URL + '/' + id);
  return response.data;
};

export const createInDb = async ({
  title,
  steps,
  ingredients,
}: RecipeData) => {
  const response = await axios.post(API_URL, {
    title,
    steps,
    ingredients,
  });
  return response.data;
};

export const updateInDb = async ({
  title,
  steps,
  ingredients,
  id,
}: RecipeDataWithID) => {
  const body = { title, steps, ingredients };

  const response = await axios.patch(`${API_URL}/${id}`, body);
  return response.data;
};
