import { uploadMedia, UploadMediaDto } from '@/entities/media';
import { UploadMediaOptions } from '@/entities/media/schemas/media.schema';

export const uploadSingleMedia = async (
  file: UploadMediaDto['file'],
  onProgress?: UploadMediaOptions['onProgress'],
) => {
  const { data } = await uploadMedia({
    file,
    onProgress,
  });

  return data.mediaId;
};
