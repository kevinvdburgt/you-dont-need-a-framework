import { z } from 'zod';

export class ValidationError extends Error {
  name = 'Validation error' as const;

  constructor(
    public readonly zodError: z.ZodError,
    public readonly target?: string,
  ) {
    super();
  }
}
