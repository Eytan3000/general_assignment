import Joi from 'joi';
import { recipeSchema } from '../utils/schemas';

class DatabaseManager<T extends Record<string, any>> {
  private dataStore: Record<string, T>;
  private id: string;
  private schema: Joi.Schema;

  constructor(schema: Joi.Schema) {
    this.id = '-1';
    this.dataStore = {};
    this.schema = schema;
  }

  private validate(body: T) {
    const { error } = this.schema.validate(body);
    if (error) throw new Error(error.details[0].message);
  }

  findAll() {
    return Object.values(this.dataStore);
  }

  findByIdAndUpdate(id: string, body: T) {
    if (!this.dataStore[id]) {
      throw new Error('Id not found');
    }

    this.validate(body);

    this.dataStore[id] = { id, ...body };
    return this.dataStore[id];
  }

  findByIdAndDelete(id: string) {
    const item = this.dataStore[id];
    if (item) {
      delete this.dataStore[id];
      return item;
    }
    return null;
  }

  create(body: T) {
    this.validate(body);

    this.id = `${Number(this.id) + 1}`;
    this.dataStore[this.id] = { id: this.id, ...body };
    return this.dataStore[this.id];
  }
}

export class Factory {
  constructor() {}

  static recipesRepository() {
    return new DatabaseManager(recipeSchema);
  }
}
