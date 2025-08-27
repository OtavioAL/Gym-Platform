import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(3, { message: 'Nome inválido' }).optional(),
  username: z.string().min(3, { message: 'Email inválido' }).optional(),
  password: z.string().min(6, { message: 'Senha inválida' }).optional(),
  role: z.enum(['admin', 'trainer', 'student']).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
