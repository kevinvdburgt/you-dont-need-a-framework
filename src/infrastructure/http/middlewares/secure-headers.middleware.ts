import { MiddlewareHandler } from 'hono';
import { secureHeaders } from 'hono/secure-headers';

export const secureHeadersMiddleware = (): MiddlewareHandler => secureHeaders();
