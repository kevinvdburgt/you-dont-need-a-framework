import { HttpBindings } from '@hono/node-server';
import { ErrorHandler } from 'hono';
import { P, match } from 'ts-pattern';
import { NotFoundError } from '../errors/not-found.error.js';
import { BadRequestError } from '../errors/bad-request.error.js';
import { ValidationError } from '../errors/validation.error.js';
import { logger } from '../../logger/logger.js';

export const errorHandler: ErrorHandler<{ Bindings: HttpBindings }> = (error, c) =>
  match(error)
    .with(P.instanceOf(ValidationError), (error) => {
      return c.json(
        {
          error: 'validation',
          target: error.target,
          issues: error.zodError.issues,
        },
        400,
      );
    })
    .with(P.instanceOf(BadRequestError), (error) => {
      return c.json(
        {
          error: 'bad-request',
          message: error.message.length > 0 ? error.message : undefined,
        },
        400,
      );
    })
    .with(P.instanceOf(NotFoundError), (error) => {
      return c.json(
        {
          error: 'not-found',
          message: error.message.length > 0 ? error.message : undefined,
        },
        404,
      );
    })
    .otherwise(() => {
      logger.error('Unhandled error', { name: error.name, message: error.message });

      return c.json(
        {
          error: 'server',
        },
        500,
      );
    });
