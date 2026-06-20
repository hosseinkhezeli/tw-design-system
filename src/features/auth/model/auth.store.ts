import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthUser } from '../types/auth.types';

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  logout: () => void;
  updateUser: (partialUser: Partial<AuthUser>) => void;
}

export const createAuthStore = (initialState?: Partial<AuthState>) => {
  return createStore<AuthState>()(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        ...initialState,

        setUser: (user: AuthUser) =>
          set({
            user,
            isAuthenticated: true,
          }),

        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
          }),

        updateUser: (partialUser: Partial<AuthUser>) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...partialUser } : null,
          })),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),

        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),

        onRehydrateStorage: () => (state) => {
          console.log('Auth store rehydrated');
        },
      },
    ),
  );
};

// Singleton instance
export const authStore = createAuthStore();
