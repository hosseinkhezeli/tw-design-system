export const OTP_LENGTH = 6;
export const CAPTCHA_LENGTH = 6;

export const OTP_COOLDOWN_SECONDS = 90;

export const PASSWORD_MIN_LENGTH = 8;

export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  CHANGE_PASSWORD: '/account/change-password',
} as const;

export const LOGIN_STEPS = {
  PHONE_NUMBER: 'PHONE_NUMBER',
  CAPTCHA: 'CAPTCHA',
  OTP: 'OTP',
} as const;

export type LoginStep = keyof typeof LOGIN_STEPS;

export const FORGOT_PASSWORD_STEPS = {
  IDENTIFIER: 'IDENTIFIER',
  CAPTCHA: 'CAPTCHA',
  OTP: 'OTP',
  RESET_PASSWORD: 'RESET_PASSWORD',
} as const;

export type ForgotPasswordStep = keyof typeof FORGOT_PASSWORD_STEPS;

export const LOGIN_BACK_MAP: Record<LoginStep, LoginStep | null> = {
  [LOGIN_STEPS.OTP]: LOGIN_STEPS.PHONE_NUMBER,
  [LOGIN_STEPS.CAPTCHA]: LOGIN_STEPS.PHONE_NUMBER,
  [LOGIN_STEPS.PHONE_NUMBER]: null,
};
