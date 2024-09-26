import { MiddlewareHandler } from 'hono';
import { cors } from 'hono/cors';

export const corsMiddleware = (): MiddlewareHandler => cors();
