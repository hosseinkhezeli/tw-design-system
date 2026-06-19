import { httpClient } from '@/shared/lib/http/http-client';
import { routes } from '../configs/api.routes';

import type { LoginSchema } from '../schemas/login.schema';
import type { LoginRequestOtpSchema } from '../schemas/login-request-otp.schema';
import type { RegisterDto } from '../schemas/register.schema';
import type { LogoutSchema } from '../schemas/logout.schema';
import type { ChangePasswordSchema } from '../schemas/change-password.schema';
import type { RefreshSchema } from '../schemas/refresh.schema';

import type {
  AuthSession,
  AuthTokens,
  CaptchaRes,
  RequestOtpRes,
} from '../types/auth.types';
import { authMocks } from '@/features/auth/mock/auth.mock';

const IS_DEV = true;

const delay = (ms: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const AuthApi = {
  login: async (payload: LoginSchema): Promise<AuthSession> => {
    if (IS_DEV) {
      await delay();
      return authMocks.login(payload);
    }
    return (await httpClient.post<AuthSession>(routes.login, payload)).data;
  },

  login_request_otp: async (
    payload: LoginRequestOtpSchema,
  ): Promise<RequestOtpRes> => {
    if (IS_DEV) {
      await delay();
      return authMocks.login_request_otp(payload);
    }
    return (
      await httpClient.post<RequestOtpRes>(routes.login_request_otp, payload)
    ).data;
  },

  register: async (payload: RegisterDto): Promise<null> => {
    if (IS_DEV) {
      await delay();
      return authMocks.register(payload);
    }
    return (await httpClient.post<null>(routes.register, payload)).data;
  },

  logout: async (payload: LogoutSchema): Promise<null> => {
    if (IS_DEV) {
      await delay();
      return authMocks.logout(payload);
    }
    return (await httpClient.post<null>(routes.logout, payload)).data;
  },

  change_phone_number: async (payload: ChangePasswordSchema): Promise<null> => {
    if (IS_DEV) {
      await delay();
      return authMocks.change_phone_number(payload);
    }
    return (await httpClient.post<null>(routes.change_phone_number, payload))
      .data;
  },

  change_password_request_otp: async (
    payload: LoginRequestOtpSchema,
  ): Promise<RequestOtpRes> => {
    if (IS_DEV) {
      await delay();
      return authMocks.login_request_otp(payload);
    }
    return (
      await httpClient.post<RequestOtpRes>(routes.login_request_otp, payload)
    ).data;
  },

  generate_captcha: async (): Promise<CaptchaRes> => {
    if (IS_DEV) {
      await delay(200);
      return authMocks.generate_captcha();
    }
    return (await httpClient.get<CaptchaRes>(routes.generate_captcha)).data;
  },

  refresh_token: async (payload: RefreshSchema): Promise<AuthTokens> => {
    if (IS_DEV) {
      await delay();
      return authMocks.refresh_token(payload);
    }
    return (await httpClient.post<AuthTokens>(routes.refresh_token, payload))
      .data;
  },
} as const;
