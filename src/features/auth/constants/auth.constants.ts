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

export const REGISTER_STEPS = {
  OTP: 'OTP',
  CAPTCHA: 'CAPTCHA',
  USER_INFO: 'USER_INFO',
} as const;

export type RegisterStep = keyof typeof REGISTER_STEPS;

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

export const REGISTER_BACK_MAP: Record<RegisterStep, RegisterStep | null> = {
  [REGISTER_STEPS.OTP]: REGISTER_STEPS.USER_INFO,
  [REGISTER_STEPS.CAPTCHA]: REGISTER_STEPS.USER_INFO,
  [REGISTER_STEPS.USER_INFO]: null,
};
