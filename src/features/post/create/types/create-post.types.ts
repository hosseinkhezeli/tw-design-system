import { PostVisibility } from '@/entities/post';
import { CREATE_POST_STEPS } from '../constants/post.constants';
import { MediaItem } from '@/entities/media/types/media.types';
import { MediaSelectionSource } from '@/features/media-selection/types/media-selection.types';

export interface CreatePostFormData {
  readonly caption: string;
  media: MediaItem[]; // Support multi later
  readonly tags: string[];
  readonly location?: string;
  readonly visibility: PostVisibility;
}

export type UploadProgress = {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  mediaId?: string;
  error?: string;
};

export interface CreatePostState {
  readonly formData: CreatePostFormData;
  readonly uploadProgress: readonly UploadProgress[];
  readonly isSubmitting: boolean;
  readonly error: string | null;
}

export type PostSource = MediaSelectionSource;
export type CreatePostStep =
  (typeof CREATE_POST_STEPS)[keyof typeof CREATE_POST_STEPS];
