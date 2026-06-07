import { httpClient } from '@/shared/lib/http/http-client';
// import {routes} from '@/config/api-routes'

export async function uploadFile(
  formData: FormData,
  onProgress?: (p: number) => void,
) {
  const response = await httpClient.post(
    //routes.upload
    '/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (event) => {
        if (!event.total) return;

        const percent = Math.round((event.loaded * 100) / event.total);

        onProgress?.(percent);
      },
    },
  );

  return response.data;
}
