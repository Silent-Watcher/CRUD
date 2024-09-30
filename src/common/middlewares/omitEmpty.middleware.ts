import type { Response, Request, NextFunction } from 'express';
import omitEmpty from 'omit-empty';

export function removeEmptyValues(omitZero: boolean = false) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = omitEmpty(req.body, { omitZero });
    next();
  };
}
