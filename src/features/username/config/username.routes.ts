import { CheckUsernameReq } from '../types/username.types';

export const routes = {
  check_username: (username: CheckUsernameReq['username']) =>
    `/check-username/${username}`,
} as const;
