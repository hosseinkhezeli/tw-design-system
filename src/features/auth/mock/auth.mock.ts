import { ChangePasswordSchema } from "@/features/auth/schemas/change-password.schema";
import { LoginRequestOtpSchema } from "@/features/auth/schemas/login-request-otp.schema";
import { LoginSchema } from "@/features/auth/schemas/login.schema";
import { LogoutSchema } from "@/features/auth/schemas/logout.schema";
import { RefreshSchema } from "@/features/auth/schemas/refresh.schema";
import { RegisterDto } from "@/features/auth/schemas/register.schema";
import { AuthSession, AuthTokens, RequestOtpRes, CaptchaRes } from "@/features/auth/types/auth.types";

let currentSession: AuthSession | null = null;
let currentTokens: AuthTokens | null = null;

export const authMocks = {
  // Login with OTP
  login: (payload: LoginSchema): AuthSession => {
    currentSession = {
      user: {
        id: 'user_' + Date.now().toString(36),
        full_name: 'أحمد محمد',
        phone_number: '+971501234567',
      },
      tokens: {
        access_token: 'mock_access_token_' + Date.now(),
        refresh_token: 'mock_refresh_token_' + Date.now(),
      },
      new_user: false,
    } as AuthSession;

    return currentSession;
  },

  // Request OTP (for login or change password)
  login_request_otp: (payload: LoginRequestOtpSchema): RequestOtpRes => {
    console.log('Mock OTP requested for phone:', payload.phone_number);

    return {
      expires_in: 120,
      request_id: 'req_' + Date.now().toString(36),
    } as RequestOtpRes;
  },

  // Register
  register: (payload: RegisterDto) => {
    console.log('Mock Register payload:', payload);

    // After register, usually user needs to login, so we can simulate new_user = true
    currentSession = {
      user: {
        id: 'user_' + Date.now().toString(36),
        full_name: payload.full_name,
        phone_number: '+971501234567',
      },
      tokens: {
        access_token: 'mock_access_token_' + Date.now(),
        refresh_token: 'mock_refresh_token_' + Date.now(),
      },
      new_user: true,
    } as AuthSession;

    return null; // as per your API
  },

  // Logout
  logout: (payload: LogoutSchema) => {
    console.log('Mock logout with refresh token');
    currentSession = null;
    currentTokens = null;
    return null;
  },

  // Change Phone Number
  change_phone_number: (payload: ChangePasswordSchema) => {
    console.log('Mock change phone number with OTP:', payload);
    return null;
  },

  // Generate Captcha
  generate_captcha: (): CaptchaRes => {
    return {
      captcha_base64:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjNmMyIvPjx0ZXh0IHg9IjUwIiB5PSI2MCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzMzMyI+NTk3NAwvdGV4dD48L3N2Zz4=',
      captcha_request_id: 'captcha_' + Date.now().toString(36),
    } as CaptchaRes;
  },

  // Refresh Token
  refresh_token: (payload: RefreshSchema): AuthTokens => {
    currentTokens = {
      access_token: 'new_mock_access_' + Date.now(),
      refresh_token: payload.refresh || 'new_mock_refresh_' + Date.now(),
    };

    return currentTokens;
  },
};
