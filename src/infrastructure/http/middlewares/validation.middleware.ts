import { zValidator } from '@hono/zod-validator';
import type { ValidationTargets, Env, Input, MiddlewareHandler } from 'hono';
import type { z, ZodSchema } from 'zod';
import { ValidationError } from '../errors/validation.error.js';

type HasUndefined<T> = undefined extends T ? true : false;

export const validationMiddleware = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets,
  E extends Env,
  P extends string,
  In = z.input<T>,
  Out = z.output<T>,
  I extends Input = {
    in: HasUndefined<In> extends true
      ? {
          [K in Target]?: K extends 'json'
            ? In
            : HasUndefined<keyof ValidationTargets[K]> extends true
              ? { [K2 in keyof In]?: ValidationTargets[K][K2] }
              : { [K2 in keyof In]: ValidationTargets[K][K2] };
        }
      : {
          [K in Target]: K extends 'json'
            ? In
            : HasUndefined<keyof ValidationTargets[K]> extends true
              ? { [K2 in keyof In]?: ValidationTargets[K][K2] }
              : { [K2 in keyof In]: ValidationTargets[K][K2] };
        };
    out: { [K in Target]: Out };
  },
  V extends I = I,
>(
  target: Target,
  schema: T,
): MiddlewareHandler<E, P, V> =>
  zValidator<T, Target, E, P, In, Out, I, V>(target, schema, (result) => {
    if (!result.success) {
      throw new ValidationError(result.error, target);
    }

    return result.data;
  });
