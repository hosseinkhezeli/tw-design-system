import { z } from 'zod';

export const UserSchema = z.object({
  id: z.uuid(),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/),
  fullName: z.string().min(1).max(80),
  bio: z.string().max(500).optional(),
  interests: z.array(z.string().min(1).max(30)).max(15).default([]),
  isVerified: z.boolean().default(false),
});

export const UpdateProfileSchema = UserSchema.pick({
  fullName: true,
  bio: true,
  interests: true,
}).partial();

export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
