import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '../constants/post.constants';
import type { MediaItem } from '../types/create-post.types';

/**
 * Enterprise service for Post Media domain logic
 */
export class PostMediaService {
  /**
   * Creates a MediaItem from a raw File with preview URL
   */
  public createMediaItem(file: File): MediaItem {
    return {
      file,
      type: 'IMAGE',
      previewUrl: URL.createObjectURL(file),
    };
  }

  /**
   * Validates image against business rules
   * @returns localized error message or null
   */
  public validateImage(file: File): string | null {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return 'فقط فرمت‌های عکس (JPG, PNG, WebP) مجاز هستند.';
    }
    if (file.size > MAX_FILE_SIZE) {
      const maxMb = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(1);
      return `حجم عکس نمی‌تواند بیشتر از ${maxMb} مگابایت باشد.`;
    }
    return null;
  }

  /**
   * Cleanup utility to prevent memory leaks
   */
  public revokePreviewUrl(previewUrl?: string): void {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  }
}
