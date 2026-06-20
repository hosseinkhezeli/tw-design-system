/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useMemo } from 'react';

import { useCheckUsername } from '../queries/use-check-username';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { MIN_USERNAME_CHARACTERS } from '../constants/username.constants';

export const useUsernameAvailability = (username?: string) => {
  const debouncedUsername = useDebounce(username?.trim() ?? '', 500);

  const { data, isLoading, isFetching, isError, error } = useCheckUsername({
    username: debouncedUsername,
  });

  const isAvailable = useMemo(() => {
    if (debouncedUsername.length < MIN_USERNAME_CHARACTERS) {
      return null;
    }

    return data ?? null;
  }, [data, debouncedUsername]);

  return {
    isChecking: isLoading || isFetching,
    isAvailable,
    isError,
    error,
  };
};
