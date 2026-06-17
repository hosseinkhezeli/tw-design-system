import { LoginRequestOtpSchema } from '../schemas/login-request-otp.schema';
import { AuthApi } from './auth.api';

export const changePhoneNumberRequestOtp = async (
  payload: LoginRequestOtpSchema,
) => {
  return AuthApi.change_password_request_otp(payload);
};
