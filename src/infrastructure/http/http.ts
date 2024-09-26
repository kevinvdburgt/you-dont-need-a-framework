import { HttpBindings, serve } from '@hono/node-server';
import { Hono } from 'hono';
import { config } from '../config/config.js';
import { logger } from '../logger/logger.js';
import { loggerMiddleware } from './middlewares/logger.middleware.js';
import { secureHeadersMiddleware } from './middlewares/secure-headers.middleware.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';
import { notFoundHandler } from './handlers/not-found.handler.js';
import { errorHandler } from './handlers/error.handler.js';

export const http = new Hono<{ Bindings: HttpBindings }>();

http.use(loggerMiddleware());
http.use(secureHeadersMiddleware());
http.use(corsMiddleware());

http.notFound(notFoundHandler);
http.onError(errorHandler);

serve({ fetch: http.fetch, hostname: config.HTTP_HOST, port: config.HTTP_PORT }, (info) => {
  logger.info(`Http server is listening`, { address: info.address, port: info.port, family: info.family });
});
