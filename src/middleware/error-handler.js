import mongoose from 'mongoose';

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = error.statusCode ?? error.status ?? 500;

  if (error instanceof mongoose.Error.ValidationError ||
      error instanceof mongoose.Error.CastError) {
    statusCode = 400;
  } else if (error.code === 11000) {
    statusCode = 409;
  }

  if (statusCode >= 500) {
    console.error(error);
  }

  const message = statusCode >= 500
    ? 'Internal server error.'
    : error.message;

  res.status(statusCode).json({
    error: { message },
  });
}
