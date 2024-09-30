import type { ZodSchema } from 'zod';
import type { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';
import { fromZodError } from 'zod-validation-error';

function validate<T, U>(scheme: ZodSchema<T>, data: U, res: Response) {
  const validationResult = scheme.safeParse(data);
  if (!validationResult.success) {
    return res.status(httpStatus.NOT_ACCEPTABLE).send({
      status: res.statusCode,
      error: {
        code: 'NOT ACCEPTABLE',
        message: fromZodError(validationResult.error).toString(),
      },
    });
  }
}

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(schema, req.body, res);
    next();
  };
}

export function validateParams<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(schema, req.params, res);
    next();
  };
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(schema, req.query, res);
    next();
  };
}
