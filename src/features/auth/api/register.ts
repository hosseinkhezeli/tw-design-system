
import { RegisterDto } from '../schemas/register.schema';
import { AuthApi } from './auth.api';

export const register = async (payload: RegisterDto) => {
  return AuthApi.register(payload);
};
