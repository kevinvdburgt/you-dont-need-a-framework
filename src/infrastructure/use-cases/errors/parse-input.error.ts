import { z } from 'zod';

export class ParseInputError extends Error {
  name = 'Parse input' as const;

  constructor(readonly zodError: z.ZodError) {
    super();
  }
}
