import { RefreshSchema } from '../schemas/refresh.schema';
import { AuthApi } from './auth.api';

export const refresh = async (payload: RefreshSchema) => {
  return AuthApi.refresh_token(payload);
};
