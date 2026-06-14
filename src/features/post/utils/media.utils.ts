import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '../constants/post.constants';
import { MediaItem } from '../schemas/create-post-schema';

export const createMediaItem = (file: File): MediaItem => ({
  file,
  type: 'IMAGE',
  previewUrl: URL.createObjectURL(file),
});

export const validateImage = (file: File): string | null => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return 'فقط فرمت‌های عکس (JPG, PNG, WebP) مجاز هستند.';
  }
  if (file.size > MAX_FILE_SIZE) {
    const maxMb = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(1);
    return `حجم عکس نمی‌تواند بیشتر از ${maxMb} مگابایت باشد.`;
  }
  return null;
};
