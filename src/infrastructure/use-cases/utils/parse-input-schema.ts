import { z } from 'zod';
import { ParseInputError } from '../errors/parse-input.error.js';

export const parseInput = <T extends z.ZodSchema<unknown>>(schema: T, data: unknown) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ParseInputError(result.error);
  }

  return result.data as ReturnType<T['parse']>;
};
