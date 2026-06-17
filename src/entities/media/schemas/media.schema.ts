import { z } from 'zod';

export const MediaSchema = z.instanceof(File);

export const UploadMediaSchema = z.object({
  file: MediaSchema,
});

export type UploadMediaDto = z.infer<typeof UploadMediaSchema>;

export interface UploadMediaOptions {
  onProgress?: (progress: number) => void;
}
