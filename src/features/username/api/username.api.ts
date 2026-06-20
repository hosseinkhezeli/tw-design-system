import { httpClient } from '@/shared/lib/http/http-client';

import { routes } from '../config/username.routes';
import { CheckUsernameReq } from '../types/username.types';
import { usernameMocks } from '../mock/username.mock';

const IS_DEV = true;

const delay = (ms: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const UsernameApi = {
  check_username: async (payload: CheckUsernameReq): Promise<boolean> => {
    if (IS_DEV) {
      await delay();
      return usernameMocks.check_username(payload);
    }
    return (
      await httpClient.get<boolean>(routes.check_username(payload.username))
    ).data;
  },
} as const;
