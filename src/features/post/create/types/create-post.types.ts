import { PostVisibility } from '@/entities/post';
import { CREATE_POST_STEPS, POST_SOURCE } from '../constants/post.constants';

export interface MediaItem {
  file: File;
  type: 'IMAGE' | 'VIDEO';
  previewUrl: string;
}

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

export type PostSource = (typeof POST_SOURCE)[keyof typeof POST_SOURCE];
export type CreatePostStep =
  (typeof CREATE_POST_STEPS)[keyof typeof CREATE_POST_STEPS];
