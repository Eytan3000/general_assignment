import express from 'express';
import rateLimit from 'express-rate-limit';
import { router as recipesRouter } from './routes/recipes.js';
import cors from 'cors'; // Import the cors package
import helmet from 'helmet';
import { checkBody } from './middleware/sanitizeBody.js';

export const app = express();

// Set security HTTP headers
app.use(helmet());

//100 requests from the same ip in 1 hour.
const limiter = rateLimit({
  limit: 100,
  windowMs: 60 * 60 * 1000,  
  message: 'Too many requests from this IP. Please try again Later.',
});

app.use('/', limiter);
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(checkBody);

app.use('/recipes', recipesRouter);
