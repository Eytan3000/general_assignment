import { Request, Response } from 'express';
import { Factory } from '../dbManager/dbManager';

const Recipes = Factory.recipesRepository();

const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const result = await Recipes.findAll();

    res.status(200).json({
      status: 'sucess',
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : 'An unknown error occurred',
    });
  }
};

const updateRecipe = async (req: Request, res: Response) => {
  try {
    const result = await Recipes.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 'sucess',
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : 'An unknown error occurred',
    });
  }
};
const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const result = await Recipes.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'sucess',
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : 'An unknown error occurred',
    });
  }
};

const createRecipe = async (req: Request, res: Response) => {
  try {
    const result = await Recipes.create(req.body);
    res.status(200).json({
      status: 'sucess',
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : 'An unknown error occurred',
    });
  }
};

export default {
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
  createRecipe,
};
