'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useStore } from 'zustand';
import { createAuthStore, AuthState } from './auth.store';

const AuthStoreContext = createContext<ReturnType<
  typeof createAuthStore
> | null>(null);

export const AuthStoreProvider = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: Partial<AuthState>;
}) => {
  const [store] = useState(() => createAuthStore(initialState));

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (state: AuthState) => T): T => {
  const context = useContext(AuthStoreContext);
  if (!context) throw new Error('Missing AuthStoreProvider');
  return useStore(context, selector);
};
