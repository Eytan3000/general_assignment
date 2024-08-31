import { NextFunction, Request, Response } from 'express';
import { sanitizeBody } from '../utils/helpers';

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  req.body = sanitizeBody(req.body);
  next();
};
