import { AuthApi } from './auth.api';

export const generateCaptcha = async () => {
  return AuthApi.generate_captcha();
};
