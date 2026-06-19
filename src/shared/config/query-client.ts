import { QueryClientConfig } from '@tanstack/react-query';

export const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
};
