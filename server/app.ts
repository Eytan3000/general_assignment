import express from 'express';
import { router as recipesRouter } from './routes/recipes.js';
import cors from 'cors';
import helmet from 'helmet';
import { checkBody } from './middleware/sanitizeBody.js';
import { limiter } from './middleware/rateLimiter.js';

export const app = express();

// Apply middlewares
app.use(cors({ origin: 'http://localhost:5173' })); // CORS
app.use(helmet()); // security HTTP headers
app.use(express.json()); // JSON parsing
app.use(checkBody); // Body sanitization
app.use(limiter);

// Route handlers
app.use('/recipes', recipesRouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });
