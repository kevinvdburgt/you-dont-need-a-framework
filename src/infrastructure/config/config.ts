import 'dotenv/config';
import { z } from 'zod';

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
});

export const config = configSchema.parse(process.env);
