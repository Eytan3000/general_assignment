import Joi from 'joi';
export const recipeSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string().required(),
  ingredients: Joi.string().required(),
  steps: Joi.string().required(),
});
