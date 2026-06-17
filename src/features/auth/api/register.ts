import { RegisterSchema } from '../schemas/register.schema';
import { AuthApi } from './auth.api';

export const register = async (payload: RegisterSchema) => {
  return AuthApi.register(payload);
};
