import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['admin', 'trainer', 'student']),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
