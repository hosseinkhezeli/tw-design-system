import { create } from 'zustand';

import type {
  CreatePostFormData,
  CreatePostState,
  UploadProgress,
} from '../types/create-post.types';
import { POST_VISIBILITY } from '@/entities/post';

const initialFormData: CreatePostFormData = {
  caption: '',
  media: [],
  tags: [],
  location: undefined,
  visibility: POST_VISIBILITY.PUBLIC,
};

interface CreatePostStore extends CreatePostState {
  readonly resetForm: () => void;
  readonly updateForm: (data: Partial<CreatePostFormData>) => void;

  readonly setUploadProgress: (progress: UploadProgress[]) => void;

  readonly updateUploadProgress: (
    fileName: string,
    patch: Partial<UploadProgress>,
  ) => void;

  readonly setSubmitting: (isSubmitting: boolean) => void;
  readonly setError: (error: string | null) => void;
}

export const useCreatePostStore = create<CreatePostStore>((set) => ({
  formData: initialFormData,

  uploadProgress: [],

  isSubmitting: false,

  error: null,

  resetForm: () =>
    set({
      formData: initialFormData,
      uploadProgress: [],
      error: null,
    }),

  updateForm: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),

  setUploadProgress: (progress) =>
    set({
      uploadProgress: progress,
    }),

  updateUploadProgress: (fileName, patch) =>
    set((state) => ({
      uploadProgress: state.uploadProgress.map((item) =>
        item.fileName === fileName ? { ...item, ...patch } : item,
      ),
    })),

  setSubmitting: (isSubmitting) =>
    set({
      isSubmitting,
    }),

  setError: (error) =>
    set({
      error,
    }),
}));
