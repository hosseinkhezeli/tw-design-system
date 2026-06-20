import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useCreatePostStore } from '../models/create-post-store';
import { createPost } from '../api/create-post';
import { uploadMedia } from '@/entities/media';
import { POST_VISIBILITY } from '@/entities/post';

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
          const { data } = await uploadMedia({
            file,
            onProgress: (progress) => {
              updateUploadProgress(file.name, {
                progress,
              });
            },
          });

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

      return createPost({
        caption: formData.caption,
        mediaIds,
        hashtags: formData.hashtags,
        title: formData.title,
        visibility: POST_VISIBILITY.PUBLIC,
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
