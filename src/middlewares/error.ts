import httpErrors from 'http-errors';
import { constants as httpConstants } from 'http2';
import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new httpErrors.NotFound(`Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(error, req, res, next) {
  error?.statusCode ? res.status(error.statusCode) : res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR);

  res.json({
    error: error.message,
  });
}
