import { z } from 'zod';

export const updateEvalSchema = z.object({
  userId: z.string().uuid({ message: 'Aluno é obrigatório' }),
  height: z.number().positive({ message: 'Altura deve ser positiva' }).optional(),
  weight: z.number().positive({ message: 'Peso deve ser positivo' }).optional(),
});

export type UpdateEvalInput = z.infer<typeof updateEvalSchema>;
