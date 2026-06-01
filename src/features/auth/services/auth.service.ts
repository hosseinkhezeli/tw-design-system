// import { API_BASE_URL } from '@/config/api';
// import { APP_ROUTES, QUERY_PARAM_KEYS } from '@/config/app-routes';
// import { routes } from '@/api/authentication/routes';

import { httpClient } from '@/shared/lib/http/http-client';
import { env } from '@/config/env';
import { APP_ROUTES } from '@/config/app-routes';
import { QUERY_PARAM_KEYS } from '@/config/query-param-keys';
// import { deleteToken, getToken, setTokens } from '@/lib/utils/token.utils';

class AuthService {
  private isRefreshing = false;
  private refreshPromise: Promise<string> | null = null;
  private subscribers: ((token: string) => void)[] = [];

  getAccessToken() {
    // return getToken('access');
    return ''
  }

  setTokens(access: string, refresh: string) {
    // setTokens(access, refresh);
  }

  logout() {
    // deleteToken();

    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname + window.location.search;

      window.location.href =
        `${APP_ROUTES.auth}?${QUERY_PARAM_KEYS.redirect}=` +
        encodeURIComponent(currentPath);
    }
  }

  async refreshToken(): Promise<string> {
    if (this.refreshPromise) return this.refreshPromise;

    this.refreshPromise = (async () => {
      //   const refresh = getToken('refresh');
      const refresh = '';

      if (!refresh) {
        this.logout();
        throw new Error('No refresh token');
      }

      const response = await httpClient.post(
        // `${env.NEXT_PUBLIC_API_URL}${routes.refresh}`,
        `${env.NEXT_PUBLIC_API_URL}`,
        {
          refresh,
        },
      );

      const { access, refresh: newRefresh } = response.data;

      this.setTokens(access, newRefresh);

      return access;
    })();

    return this.refreshPromise.finally(() => {
      this.refreshPromise = null;
    });
  }

  addSubscriber(cb: (token: string) => void) {
    this.subscribers.push(cb);
  }

  notifySubscribers(token: string) {
    this.subscribers.forEach((cb) => cb(token));
    this.subscribers = [];
  }

  setRefreshing(value: boolean) {
    this.isRefreshing = value;
  }

  getRefreshing() {
    return this.isRefreshing;
  }
}

export const authService = new AuthService();
