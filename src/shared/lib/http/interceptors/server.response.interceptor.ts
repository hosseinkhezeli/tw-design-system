import { AxiosInstance } from 'axios';
import { cookies } from 'next/headers';

export const setupResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(async (config) => {
    // In Next 16, cookies() is strictly asynchronous
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    if (cookieString && config.headers) {
      config.headers.Cookie = cookieString;
    }
    return config;
  });
};
