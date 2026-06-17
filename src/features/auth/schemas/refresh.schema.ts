import { z } from 'zod';

export const refreshSchema = z.object({
  refresh: z.string(),
});

export type RefreshSchema = z.infer<typeof refreshSchema>;
