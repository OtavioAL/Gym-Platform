import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, { message: 'Nome inválido' }),
  username: z.string().min(3, { message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha inválida' }),
  role: z.enum(['admin', 'trainer', 'student']),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
