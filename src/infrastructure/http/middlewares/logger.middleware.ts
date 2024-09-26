import { MiddlewareHandler } from 'hono';
import { logger } from '../../logger/logger.js';

export const loggerMiddleware = (): MiddlewareHandler => async (c, next) => {
  const start = performance.now();

  await next();

  const duration = performance.now() - start;

  logger.info(`${c.req.method} ${c.req.url} ${c.res.status} ${duration.toFixed(2)}ms`);
};
