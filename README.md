# Project Name

## Project Overview

Briefly describe what your project does, its purpose, and any unique aspects that set it apart.

## Features

- List of key features of the project
- Another feature
- More features

### Installation

#### Client

1. Navigate to the client directory:

```bash
   cd client
```

2. Install dependencies:

```bash
   npm install
```

3. Run the application:

```bash
   npm run dev
```

#### Server

1. Navigate to the server directory:

```bash
   cd server
```

2. Install dependencies:

```bash
   npm install
```

3. Start the server:

```bash
   npm run dev
```

### Running the Project

Open your browser and navigate to `http://localhost:5173` to see the project in action.

## Project Structure

Briefly describe the structure of your project:

```plaintext
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   ├── services
│   ├── App.tsx
│   └── index.tsx
├── .gitignore
├── package.json
└── README.md
```


* all places that need to change:
recipesRepository
app.use('/recipes', recipesRouter);


router
  .route('/')
  .get(recipesController.getAllRecipes)
  .post(recipesController.createRecipe);

router
  .route('/:id')
  .patch(recipesController.updateRecipe)
  .delete(recipesController.deleteRecipe);

schemas