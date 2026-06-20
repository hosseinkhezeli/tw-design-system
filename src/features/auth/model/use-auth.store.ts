import { useStore } from 'zustand';
import { authStore } from './auth.store';

export const useAuthStore = () => useStore(authStore);
