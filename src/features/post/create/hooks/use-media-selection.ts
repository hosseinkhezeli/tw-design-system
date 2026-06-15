import { useRef, useState, useMemo } from 'react';

import { useCreatePostStore } from '../models/create-post-store';
import { PostMediaService } from '../lib/post-media.service';

import { ACCEPTED_IMAGE_TYPES } from '../constants/post.constants';

export const useMediaSelection = () => {
  const mediaService = useMemo(() => new PostMediaService(), []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  const media = useCreatePostStore((state) => state.formData.media);

  const updateForm = useCreatePostStore((state) => state.updateForm);

  const addMedia = (file: File) => {
    setError(null);

    const validationError = mediaService.validateImage(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    const mediaItem = mediaService.createMediaItem(file);

    updateForm({
      media: [...media, mediaItem],
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    files.forEach(addMedia);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeMedia = (previewUrl: string) => {
    const mediaToRemove = media.find((item) => item.previewUrl === previewUrl);

    if (mediaToRemove) {
      mediaService.revokePreviewUrl(mediaToRemove.previewUrl);
    }

    updateForm({
      media: media.filter((item) => item.previewUrl !== previewUrl),
    });
  };

  const clearMedia = () => {
    media.forEach((item) => {
      mediaService.revokePreviewUrl(item.previewUrl);
    });

    updateForm({
      media: [],
    });

    setError(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCamera = () => {
    const cameraInput = document.createElement('input');

    cameraInput.type = 'file';
    cameraInput.accept = ACCEPTED_IMAGE_TYPES.join(',');

    cameraInput.capture = 'environment';
    cameraInput.style.display = 'none';

    cameraInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;

      const file = target.files?.[0];

      if (file) {
        addMedia(file);
      }

      document.body.removeChild(cameraInput);
    };

    document.body.appendChild(cameraInput);

    cameraInput.click();
  };

  return {
    media,
    error,
    fileInputRef,

    handleFileChange,
    triggerFileInput,
    triggerCamera,

    addMedia,
    removeMedia,
    clearMedia,
  };
};
