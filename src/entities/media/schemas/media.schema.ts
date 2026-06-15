import { z } from 'zod';

export const MediaSchema = z.instanceof(File);

export const UploadMediaSchema = z.object({
  file: MediaSchema,
  onProgress: z.function({
    input: [z.number()],
    output: z.void(),
  }),
});

export type UploadMediaDto = z.infer<typeof UploadMediaSchema>;
