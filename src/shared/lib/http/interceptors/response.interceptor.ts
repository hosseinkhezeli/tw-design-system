// import { enqueueSnackbar } from 'notistack';

import { authService } from '@/features/auth/services/auth.service';
import { httpClient } from '../http-client';

// import { routes } from '@/api/authentication/routes';
import { APP_ROUTES } from '@/config/app-routes';

let refreshSubscribers: ((token: string) => void)[] = [];

httpClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    const isAuthError = status === 401 || status === 403;
    // const isRefreshRequest = original.url?.includes(routes.refresh);
    const isRefreshRequest = false;

    const currentPath =
      typeof window !== 'undefined' ? window.location.pathname : '';

    // Blob handling (keep it local, it's fine)
    if (
      error.response?.data instanceof Blob &&
      original?.responseType === 'blob'
    ) {
      try {
        const text = await error.response.data.text();
        error.response.data = JSON.parse(text);
      } catch {}
    }

    // Non-auth errors → UI feedback
    if (!isAuthError && !isRefreshRequest) {
    //   enqueueSnackbar({
    //     variant: 'error',
    //     message:
    //       error.response?.data?.message || error.message || 'Unexpected error',
    //   });

      return Promise.reject(error);
    }

    // Skip refresh in auth pages if needed
    const isPasswordFlow = false; // keep your existing logic here

    if (
      (!currentPath.includes(APP_ROUTES.auth.login) ||
        !currentPath.includes(APP_ROUTES.auth.register)) &&
      !isPasswordFlow
    ) {
      if (isAuthError && !original._retry) {
        original._retry = true;

        if (authService.getRefreshing()) {
          return new Promise((resolve) => {
            refreshSubscribers.push((token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(httpClient(original));
            });
          });
        }

        authService.setRefreshing(true);

        try {
          const newToken = await authService.refreshToken();

          authService.setRefreshing(false);

          refreshSubscribers.forEach((cb) => cb(newToken));
          refreshSubscribers = [];

          authService.notifySubscribers(newToken);

          original.headers.Authorization = `Bearer ${newToken}`;

          return httpClient(original);
        } catch (err) {
          authService.setRefreshing(false);
          refreshSubscribers = [];

          authService.logout();
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  },
);
