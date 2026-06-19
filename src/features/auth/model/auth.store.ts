import { createStore } from 'zustand/vanilla';
import { AuthUser } from '@/features/auth/types/auth.types';

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

export const createAuthStore = (initialState?: Partial<AuthState>) => {
  return createStore<AuthState>()(() => ({
    isAuthenticated: false,
    user: null,
    ...initialState,
  }));
};
