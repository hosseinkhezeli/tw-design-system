import { LoginRequestOtpSchema } from '../schemas/login-request-otp.schema';
import { AuthApi } from './auth.api';

export const loginRequestOtp = async (payload: LoginRequestOtpSchema) => {
  return AuthApi.login_request_otp(payload);
};
