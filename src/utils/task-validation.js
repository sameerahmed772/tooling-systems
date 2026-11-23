import AppError from './app-error.js';

const allowedFields = new Set(['title', 'description', 'completed']);

export function parseTaskPayload(body, { partial = false } = {}) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new AppError('Request body must be a JSON object.', 400);
  }

  const keys = Object.keys(body);
  const unknownFields = keys.filter((key) => !allowedFields.has(key));

  if (unknownFields.length > 0) {
    throw new AppError(
      `Unknown field(s): ${unknownFields.join(', ')}.`,
      400,
    );
  }

  if (partial && keys.length === 0) {
    throw new AppError('At least one field is required for an update.', 400);
  }

  if (!partial && !Object.hasOwn(body, 'title')) {
    throw new AppError('The title field is required.', 400);
  }

  const result = {};

  if (Object.hasOwn(body, 'title')) {
    if (typeof body.title !== 'string') {
      throw new AppError('The title must be a string.', 400);
    }

    const title = body.title.trim();

    if (title.length === 0 || title.length > 120) {
      throw new AppError('The title must contain between 1 and 120 characters.', 400);
    }

    result.title = title;
  }

  if (Object.hasOwn(body, 'description')) {
    if (typeof body.description !== 'string') {
      throw new AppError('The description must be a string.', 400);
    }

    const description = body.description.trim();

    if (description.length > 1000) {
      throw new AppError('The description cannot exceed 1000 characters.', 400);
    }

    result.description = description;
  }

  if (Object.hasOwn(body, 'completed')) {
    if (typeof body.completed !== 'boolean') {
      throw new AppError('The completed field must be a boolean.', 400);
    }

    result.completed = body.completed;
  }

  return result;
}

export function validateTaskPayload(options = {}) {
  return (req, res, next) => {
    try {
      req.validatedBody = parseTaskPayload(req.body, options);
      next();
    } catch (error) {
      next(error);
    }
  };
}
