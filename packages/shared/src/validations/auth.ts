import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha inválida' }),
});
export type LoginInput = z.infer<typeof loginSchema>;
