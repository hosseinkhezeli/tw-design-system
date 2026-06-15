import { create } from 'zustand';
import { Post } from '../types/post.types';

interface PostStoreState {
  readonly currentPost: Post | null;
  readonly isLoading: boolean;
  readonly error: string | null;
}

export const usePostStore = create<PostStoreState>((set) => ({
  currentPost: null,
  isLoading: false,
  error: null,
}));
