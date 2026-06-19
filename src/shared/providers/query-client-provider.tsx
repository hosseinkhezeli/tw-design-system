'use client';
import { createQueryClient } from '@/shared/lib/react-query/query-client';
import { QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

type Props = {
  children: ReactNode;
};

export function QueryClientProvider({ children }: Props) {
  const [queryClient] = useState(() => createQueryClient());
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
