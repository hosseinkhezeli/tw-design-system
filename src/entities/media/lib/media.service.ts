import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '../constants/media.constants';
import { MediaItem } from '../types/media.types';

export class MediaService {
  createMediaItem(file: File): MediaItem {
    return {
      file,
      type: 'IMAGE',
      previewUrl: URL.createObjectURL(file),
    };
  }

  validateImage(file: File): string | null {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return 'فقط فرمت‌های عکس مجاز هستند.';
    }

    if (file.size > MAX_FILE_SIZE) {
      const maxMb = (MAX_FILE_SIZE / 1024 / 1024).toFixed(1);

      return `حجم فایل نمی‌تواند بیشتر از ${maxMb} مگابایت باشد.`;
    }

    return null;
  }

  revokePreviewUrl(previewUrl?: string) {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  }
}
