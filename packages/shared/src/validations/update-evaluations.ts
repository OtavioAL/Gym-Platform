import { z } from 'zod';

export const updateEvalSchema = z.object({
  userId: z.string().uuid(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
});

export type UpdateEvalInput = z.infer<typeof updateEvalSchema>;
