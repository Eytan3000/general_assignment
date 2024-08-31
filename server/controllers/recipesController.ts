import { Request, Response } from 'express';
import { Factory } from '../dbManager/dbManager';
import Joi from 'joi';

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

const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const result = await Recipes.findAll();

    res.status(200).json({
      status: 'success',
      message: result,
    });
  } catch (err) {
    handleError(res, err);
  }
};

const updateRecipe = async (req: Request, res: Response) => {
  try {
    const result = await Recipes.findByIdAndUpdate(req.params.id, req.body);

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

const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const result = await Recipes.findByIdAndDelete(req.params.id);
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

const createRecipe = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const result = await Recipes.create(req.body);
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
