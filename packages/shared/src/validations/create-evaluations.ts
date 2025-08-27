import { z } from 'zod';

export const createEvalSchema = z.object({
  userId: z.string().uuid({ message: 'Aluno é obrigatório' }),
  height: z.number().positive({ message: 'Altura deve ser positiva' }),
  weight: z.number().positive({ message: 'Peso deve ser positivo' }),
});

export type CreateEvalInput = z.infer<typeof createEvalSchema>;
