import { httpClient } from '@/shared/lib/http/http-client';
import { routes } from '../configs/api.routes';

import { UploadMediaDto,UploadMediaOptions  } from '../schemas/media.schema';

export const MediaApi = {
  upload: async ({ file, onProgress }: UploadMediaDto & UploadMediaOptions) => {
    const formData = new FormData();

    formData.append('media', file);

    return httpClient.post<{ mediaId: string }>(routes.upload, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (event.total) {
          onProgress?.(Math.round((event.loaded * 100) / event.total));
        }
      },
    });
  },
} as const;

