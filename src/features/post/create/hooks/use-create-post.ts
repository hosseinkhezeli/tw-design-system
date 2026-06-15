import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CreatePostApi } from '../api/create-post-api';
import { useCreatePostStore } from '../models/create-post-store';

export const useCreatePost = () => {
  const {
    formData,
    setSubmitting,
    setError,
    resetForm,
    setUploadProgress,
    updateUploadProgress,
  } = useCreatePostStore();

  return useMutation({
    mutationFn: async () => {
      setSubmitting(true);

      const files = formData.media.map((item) => item.file);

      setUploadProgress(
        files.map((file) => ({
          fileName: file.name,
          progress: 0,
          status: 'pending',
        })),
      );

      const mediaIds: string[] = [];

      for (const file of files) {
        updateUploadProgress(file.name, {
          status: 'uploading',
        });

        try {
          const { data } = await CreatePostApi.uploadMedia({file,onProgress: (progress) => {
            updateUploadProgress(file.name, {
              progress,
            });
          }});

          mediaIds.push(data.mediaId);

          updateUploadProgress(file.name, {
            progress: 100,
            status: 'success',
            mediaId: data.mediaId,
          });
        } catch (error) {
          updateUploadProgress(file.name, {
            status: 'error',
            error: error instanceof Error ? error.message : 'Upload failed',
          });

          throw error;
        }
      }

      return CreatePostApi.create({
        caption: formData.caption,
        mediaIds,
        tags: formData.tags,
        location: formData.location,
        visibility: formData.visibility,
      });
    },

    onSuccess: () => {
      resetForm();
    },

    onError: (error) => {
      setError((error as AxiosError)?.message ?? 'Failed to create post');
    },

    onSettled: () => {
      setSubmitting(false);
    },
  });
};
