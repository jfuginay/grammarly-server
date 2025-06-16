import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './error-handler';

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const documentSchema = Joi.object({
  title: Joi.string().required().min(1).max(255),
  content: Joi.string().required(),
});

const grammarCheckSchema = Joi.object({
  text: Joi.string().required(),
  documentId: Joi.string().uuid().optional(),
});

export const validateRegistration = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    throw new AppError(400, error.details[0].message);
  }
  next();
};

export const validateLogin = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw new AppError(400, error.details[0].message);
  }
  next();
};

export const validateDocument = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { error } = documentSchema.validate(req.body);
  if (error) {
    throw new AppError(400, error.details[0].message);
  }
  next();
};

export const validateGrammarCheck = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { error } = grammarCheckSchema.validate(req.body);
  if (error) {
    throw new AppError(400, error.details[0].message);
  }
  next();
}; 