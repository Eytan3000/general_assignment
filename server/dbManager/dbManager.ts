// import db from '../db';
import Joi from 'joi';

import { RecipeData } from '../types';
import { recipeSchema } from '../utils/schemas';

// const recipesSchema = Joi.object({
//   steps: Joi.string(),
// });

// export interface QueryParams {
//   [key: string]: string | number | undefined;
//   fields?: string;
//   sort?: string;
//   limit?: number;
//   page?: number;
//   join?: string;
//   on?: string;
// }

// class QueryBuilder {
//   private tableName: string;
//   private query: string;
//   private values: (string | number)[];
//   private count: number;

//   constructor(tableName: string) {
//     this.tableName = tableName;
//     this.query = '';
//     this.values = [];
//     this.count = 1;
//   }

//   select(fields = '*') {
//     this.query = `SELECT ${fields} FROM ${this.tableName} `;
//     return this;
//   }

//   join(table?: string) {
//     if (table) {
//       this.query += ` JOIN ${table}`;
//     }
//     return this;
//   }

//   on(condition?: string) {
//     if (condition) {
//       this.query += ` ON ${condition}`;
//     }
//     return this;
//   }

//   where(conditions: QueryParams) {
//     if (Object.keys(conditions).length) {
//       const conditionStr = Object.entries(conditions)
//         .map(([key, value]) => {
//           if (value) this.values.push(value);
//           return `${key}=$${this.count++}`;
//         })
//         .join(' AND ');
//       this.query += ` WHERE ${conditionStr}`;
//     }
//     return this;
//   }

//   orderBy(sort?: string) {
//     if (sort) {
//       this.query += ` ORDER BY ${sort}`;
//     }
//     return this;
//   }

//   limit(limit?: number) {
//     if (limit) {
//       this.query += ` LIMIT ${limit}`;
//     }
//     return this;
//   }

//   offset(offset?: number) {
//     if (offset) {
//       this.query += ` OFFSET $${this.count}`;
//       this.values.push(offset);
//     }
//     return this;
//   }

//   build() {
//     console.log('query: ', this.query);
//     return { query: this.query, values: this.values };
//   }
// }

// class DatabaseRepository {
//   private tableName: string;
//   private schema: Joi.Schema;
//   private allowedSearchKeys: string[];

//   constructor(
//     tableName: string,
//     schema: Joi.Schema,
//     allowedSearchKeys: string[]
//   ) {
//     this.tableName = tableName;
//     this.schema = schema;
//     this.allowedSearchKeys = allowedSearchKeys;
//   }

//   #validate(body: any) {
//     const { error } = this.schema.validate(body);
//     if (error) throw new Error('Validation Error');
//   }

//   #isAllowedColumn(column: string) {
//     return this.allowedSearchKeys.includes(column);
//   }
//   #validateQueryParams(queryObj: Record<string, any>) {
//     return Object.keys(queryObj).some((key) => !this.#isAllowedColumn(key));
//   }
//   #excludeFields(queryParams: QueryParams) {
//     const excludedFields = ['page', 'sort', 'limit', 'fields', 'join', 'on'];
//     return Object.keys(queryParams).reduce((acc, key) => {
//       if (!excludedFields.includes(key)) {
//         acc[key] = queryParams[key];
//       }
//       return acc;
//     }, {} as QueryParams);
//   }

//   findById(id: string | number) {
//     const query = `SELECT * FROM ${this.tableName} WHERE id=$1`;
//     return db.query(query, [id]);
//   }

//   findByIdAndDelete(id: string | number) {
//     const query = ` DELETE FROM ${this.tableName} WHERE id=$1`;
//     return db.query(query, [id]);
//   }

//   async findByIdAndUpdate(id: string, body: Record<string, any>) {
//     const columns = Object.keys(body);
//     const values = Object.values(body);

//     const coumnsAndValueNums = columns
//       .map((column, index) => `${column} = $${index + 2}`)
//       .join(', ');

//     const query = ` UPDATE ${this.tableName} SET ${coumnsAndValueNums} WHERE id = $1 RETURNING *`;

//     return db.query(query, [id, ...values]);
//   }

//   findAll(queryParams: QueryParams) {
//     const { fields, sort, limit, page, join, on } = queryParams;
//     const queryObj = this.#excludeFields(queryParams);

//     const notAllowedKeys = this.#validateQueryParams(queryObj);

//     if (notAllowedKeys) {
//       throw new Error('Invalid query params');
//     }

//     const offsetValue = page ? (page - 1) * (limit || 0) : 0;

//     const builder = new QueryBuilder(this.tableName)
//       .select(fields)
//       .join(join)
//       .on(on)
//       .where(queryObj)
//       .orderBy(sort)
//       .limit(limit)
//       .offset(offsetValue);

//     const { query, values } = builder.build();
//     return db.query(query, values);
//   }

//   async create(body: Record<string, any>) {
//     // this.#validate(body);

//     const columns = Object.keys(body).join(', ');
//     const placeholders = Object.keys(body)
//       .map((_, index) => `$${index + 1}`)
//       .join(', ');
//     const values = Object.values(body);
//     const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
//     console.log('query: ', query); //removeEytan
//     return db.query(query, values);
//   }
// }
// --------------------------------------------------------------
// // interface Recipe {
// //   id: string;
// //   title: string;
// //   ingredients: string;
// //   steps: string;
// // }
// // class DatabaseRepository {
// //   private tableName: string;
// //   private schema: Joi.Schema;
// //   private allowedSearchKeys: string[];
// //   private recipes: Recipe[];

// //   constructor(
// //     tableName: string,
// //     schema: Joi.Schema,
// //     allowedSearchKeys: string[]
// //   ) {
// //     this.tableName = tableName;
// //     this.schema = schema;
// //     this.allowedSearchKeys = allowedSearchKeys;
// //     this.recipes = [];
// //   }
// //   findAll() {
// //     console.log('this.recipes: ', this.recipes); //removeEytan
// //     return this.recipes;
// //   }
// //   findByIdAndUpdate(id: string, body: Recipe) {
// //     const index = this.recipes.findIndex((recipe) => recipe.id === id);
// //     this.recipes[index] = body;
// //   }
// //   findByIdAndDelete(id: string) {
// //     const index = this.recipes.findIndex((recipe) => recipe.id === id);
// //     if (index !== -1) {
// //       const newRecipes = this.recipes.splice(index, 1);
// //       return newRecipes;
// //     }
// //     throw new Error('Id not found!');
// //   }
// //   create(recipe: Recipe) {
// //     this.recipes.push(recipe);
// //   }
// // }
// // --------------------------------------------------------------

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
