import { authService } from './auth.service';

export async function bootstrapSession() {
  try {
    await authService.refreshToken();
    return true;
  } catch {
    authService.setAccessToken(null);
    return false;
  }
}
