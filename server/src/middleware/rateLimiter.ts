import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  limit: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP. Please try again later.',
});

