import { z } from 'zod';
import { http } from '../../../../infrastructure/http/http.js';
import { validationMiddleware } from '../../../../infrastructure/http/middlewares/validation.middleware.js';
import { evaluateUseCase } from '../../use-cases/evaluate.use-case.js';
import { ParseInputError } from '../../../../infrastructure/use-cases/errors/parse-input.error.js';
import { ValidationError } from '../../../../infrastructure/http/errors/validation.error.js';
import { InvalidExpressionError } from '../../errors/invalid-expression.error.js';
import { BadRequestError } from '../../../../infrastructure/http/errors/bad-request.error.js';

export const evaluateHandler = () =>
  http.post(
    '/math/evaluate',
    validationMiddleware(
      'json',
      z.object({
        expression: z.string(),
      }),
    ),
    async (c) => {
      const { expression } = c.req.valid('json');

      const { result } = await evaluateUseCase({ expression }).catch((error: unknown) => {
        if (error instanceof ParseInputError) {
          throw new ValidationError(error.zodError);
        }

        if (error instanceof InvalidExpressionError) {
          throw new BadRequestError(error.name);
        }

        throw error;
      });

      return c.json({ result }, 200);
    },
  );
