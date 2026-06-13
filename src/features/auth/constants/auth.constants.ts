export const OTP_LENGTH = 6;

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
  CREDENTIALS: 'CREDENTIALS',
  CAPTCHA: 'CAPTCHA',
  OTP: 'OTP',
} as const;

export type LoginStep = keyof typeof LOGIN_STEPS;

export const REGISTER_STEPS = {
  USER_INFO: 'USER_INFO',
  CAPTCHA: 'CAPTCHA',
  OTP: 'OTP',
} as const;

export type RegisterStep = keyof typeof REGISTER_STEPS;

export const FORGOT_PASSWORD_STEPS = {
  IDENTIFIER: 'IDENTIFIER',
  CAPTCHA: 'CAPTCHA',
  OTP: 'OTP',
  RESET_PASSWORD: 'RESET_PASSWORD',
} as const;

export type ForgotPasswordStep = keyof typeof FORGOT_PASSWORD_STEPS;
