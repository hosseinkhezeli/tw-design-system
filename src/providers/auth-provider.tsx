// import { serverHttpClient } from '@/shared/lib/http/server-http-client';
import { PropsWithChildren } from 'react';

export async function AuthProvider({ children }: PropsWithChildren) {
  let initialUser = null;

  try {
    // const { data } = await serverHttpClient.get('/users/me');
    initialUser = {};
  } catch {
    // Fails silently if unauthenticated
  }

  return children;
}
