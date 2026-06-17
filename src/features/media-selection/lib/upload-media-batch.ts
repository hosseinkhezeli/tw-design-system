import { uploadSingleMedia } from '../api/upload-media';

export const uploadMediaBatch = async (
  files: File[],
  onProgress?: (fileName: string, progress: number) => void,
) => {
  const mediaIds: string[] = [];

  for (const file of files) {
    const mediaId = await uploadSingleMedia(file, (progress) => {
      onProgress?.(file.name, progress);
    });

    mediaIds.push(mediaId);
  }

  return mediaIds;
};
