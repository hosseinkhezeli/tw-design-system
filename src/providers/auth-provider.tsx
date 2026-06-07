'use client';

import { bootstrapSession } from '@/features/auth/services/bootstrap-session';
import { PropsWithChildren, useEffect, useState } from 'react';

export function AuthProvider({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    bootstrapSession().finally(() => setReady(true));
  }, []);

  if (!ready) {
    return null;
  }

  return children;
}
