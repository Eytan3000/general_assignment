import { Request, Response } from 'express';
import { Factory } from '../dbManager/dbManager';

const Recipes = Factory.recipesRepository();

const handleError = (res: Response, err: unknown) => {
  let message = '';

  if (typeof err === 'string') {
    message = err;
  } else if (err instanceof Error) {
    message = err.message;
  } else {
    message = 'An unknown error occurred';
  }

  res.status(500).json({
    status: 'error',
    message,
  });
};

const getAllRecipes = (req: Request, res: Response) => {
  try {
    const result = Recipes.findAll();

    res.status(200).json({
      status: 'success',
      message: result,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const updateRecipe = (req: Request, res: Response) => {
  try {
    const result = Recipes.findByIdAndUpdate(req.params.id, req.body);

    if (result) {
      res.status(200).json({
        status: 'success',
        message: result,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Recipe not found',
      });
    }
  } catch (err) {
    handleError(res, err);
  }
};

const deleteRecipe = (req: Request, res: Response) => {
  try {
    const result = Recipes.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Recipe not found',
      });
    }
  } catch (err) {
    handleError(res, err);
  }
};

const createRecipe = (req: Request, res: Response) => {
  try {
    const result = Recipes.create(req.body);
    res.status(201).json({
      status: 'success',
      message: result,
    });
  } catch (err) {
    handleError(res, err);
  }
};

export default {
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  createRecipe,
};
