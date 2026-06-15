import { create } from 'zustand';
import { User } from '../types/user.types';

interface UserStoreState {
  readonly currentUser: User | null;
  readonly isLoading: boolean;
  readonly error: string | null;
}

export const useUserStore = create<UserStoreState>((set) => ({
  currentUser: null,
  isLoading: false,
  error: null,
}));
