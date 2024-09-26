import { NotFoundHandler } from 'hono';
import { NotFoundError } from '../errors/not-found.error.js';

export const notFoundHandler: NotFoundHandler = () => {
  throw new NotFoundError();
};
