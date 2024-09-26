import { z } from 'zod';
import { evaluate } from 'mathjs';
import { parseInput } from '../../../infrastructure/use-cases/utils/parse-input-schema.js';
import { InvalidExpressionError } from '../errors/invalid-expression.error.js';
import { match } from 'ts-pattern';

const schema = z.object({
  expression: z.string(),
});

export const evaluateUseCase = async (input: z.input<typeof schema>) => {
  const { expression } = parseInput(schema, input);

  try {
    const result = evaluate(expression);

    return match(result)
      .when(
        (result) => typeof result === 'string',
        (result) => ({ result }),
      )
      .when(
        (result) => typeof result === 'number',
        (result) => ({ result: result.toString() }),
      )
      .otherwise(() => {
        throw new InvalidExpressionError();
      });
  } catch {
    throw new InvalidExpressionError();
  }
};
