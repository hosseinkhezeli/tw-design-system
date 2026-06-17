import { uploadMedia } from '@/entities/media';
import { useMutation } from '@tanstack/react-query';

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: uploadMedia,
  });
};
