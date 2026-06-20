'use client';
import { authStore } from '@/features/auth/model/auth.store';
import { PropsWithChildren, useEffect } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    authStore.persist.rehydrate();
  }, []);

  return children;
}
