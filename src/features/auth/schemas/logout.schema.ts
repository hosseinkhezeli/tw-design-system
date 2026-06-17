import { z } from 'zod';

export const logoutSchema = z.object({
  refresh: z.string(),
});

export type LogoutSchema = z.infer<typeof logoutSchema>;
