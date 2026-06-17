import { ChangePasswordSchema } from '../schemas/change-password.schema';
import { AuthApi } from './auth.api';

export const changePhoneNumber = async (payload: ChangePasswordSchema) => {
  return AuthApi.change_phone_number(payload);
};
