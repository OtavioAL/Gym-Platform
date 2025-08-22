import { z } from 'zod';

export const createEvalSchema = z.object({
  userId: z.string().uuid(),
  height: z.number().positive(),
  weight: z.number().positive(),
});

export type CreateEvalInput = z.infer<typeof createEvalSchema>;
