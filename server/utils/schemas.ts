import Joi from 'joi';
export const recipeSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    steps: Joi.string().required(),
  });