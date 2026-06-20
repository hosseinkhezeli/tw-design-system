import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/config/query-keys';
import {
  MIN_USERNAME_CHARACTERS,
  CHECK_USERNAME_STALE,
} from '../constants/username.constants';
import { CheckUsernameReq } from '@/features/username/types/username.types';
import { checkUsername } from '@/features/username/api/check-username';

export function useCheckUsername(payload: CheckUsernameReq) {
  const normalizedUsername = payload?.username?.trim().toLowerCase() ?? '';
  return useQuery({
    queryFn: () => checkUsername({ username: normalizedUsername }),
    queryKey:
      QUERY_KEYS.authentication.username_availibility(normalizedUsername),
    enabled: normalizedUsername.trim().length >= MIN_USERNAME_CHARACTERS,
    staleTime: CHECK_USERNAME_STALE,
  });
}
