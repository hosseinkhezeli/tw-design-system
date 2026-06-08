// import { routes } from '@/api/authentication/routes';

import { httpClient } from '@/shared/lib/http/http-client';
import { navigation } from '@/shared/services/navigation';

class AuthService {
  private accessToken: string | null = null;
  private refreshPromise: Promise<string> | null = null;

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  isAuthenticated() {
    return !!this.accessToken;
  }

  async logout() {
    try {
      // await httpClient.post(routes.logout);
      await httpClient.post('/auth/logout');
    } catch {}

    this.setAccessToken(null);

    if (typeof window !== 'undefined') {
      navigation.goToLogin();
    }
  }

  async refreshToken() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      // const response = await httpClient.post(routes.refresh);
      const response = await httpClient.post('/auth/refresh');

      const accessToken = response.data.accessToken;

      this.setAccessToken(accessToken);

      return accessToken;
    })();

    return this.refreshPromise.finally(() => {
      this.refreshPromise = null;
    });
  }
}

export const authService = new AuthService();
