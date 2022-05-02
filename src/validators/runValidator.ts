import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import * as returnResponse from '../helpers/response';

const runValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = returnResponse.error(errors.array()[0].msg);
    return res.status(400).json(error);
  }
  next();
};

export default runValidation;
