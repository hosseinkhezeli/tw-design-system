import { useRef, useState, useEffect, useCallback } from 'react';
import { ACCEPTED_IMAGE_TYPES } from '../constants/post.constants';
import { MediaItem } from '../schemas/create-post-schema';
import { validateImage, createMediaItem } from '../utils/media.utils';

export const useMediaUpload = (initialMedia: MediaItem[] = []) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(
    initialMedia[0] || null,
  );
  const [error, setError] = useState<string | null>(null);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (selectedMedia?.previewUrl) {
        URL.revokeObjectURL(selectedMedia.previewUrl);
      }
    };
  }, [selectedMedia]);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      const validationError = validateImage(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      const newMedia = createMediaItem(file);
      // Revoke previous URL if exists
      if (selectedMedia?.previewUrl) {
        URL.revokeObjectURL(selectedMedia.previewUrl);
      }
      setSelectedMedia(newMedia);
    },
    [selectedMedia],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleFile(file);

    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeMedia = () => {
    if (selectedMedia?.previewUrl) {
      URL.revokeObjectURL(selectedMedia.previewUrl);
    }
    setSelectedMedia(null);
    setError(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCamera = () => {
    // For camera we need a separate hidden input with capture attribute
    const cameraInput = document.createElement('input');
    cameraInput.type = 'file';
    cameraInput.accept = ACCEPTED_IMAGE_TYPES.join(',');
    cameraInput.capture = 'environment';
    cameraInput.style.display = 'none';

    cameraInput.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      document.body.removeChild(cameraInput);
    };

    document.body.appendChild(cameraInput);
    cameraInput.click();
  };

  return {
    selectedMedia,
    error,
    fileInputRef,
    handleFileChange,
    removeMedia,
    triggerFileInput,
    triggerCamera,
    setSelectedMedia,
  };
};
