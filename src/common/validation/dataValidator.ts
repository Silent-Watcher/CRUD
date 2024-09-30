import type { ZodSchema } from 'zod';
import type { Response, Request, NextFunction } from 'express';
import httpErrors from 'http-errors';
import { fromZodError } from 'zod-validation-error';

export function validate<T, U>(scheme: ZodSchema<T>, data: U) {
  const validationResult = scheme.safeParse(data);
  if (!validationResult.success) {
    throw new httpErrors.NotAcceptable(
      fromZodError(validationResult.error).toString(),
    );
  } else {
    return;
  }
}

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      validate(schema, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function validateParams<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      validate(schema, req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      validate(schema, req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
}
