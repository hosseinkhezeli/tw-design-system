import { QUERY_CLIENT_CONFIG } from '@/shared/config/query-client';
import { QueryClient } from '@tanstack/react-query';

export function createQueryClient() {
  return new QueryClient(QUERY_CLIENT_CONFIG);
}
