/* eslint-disable */
import { validationResult } from 'express-validator';
import {NextFunction, Request, Response,} from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction): Response | void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    next();
  };

