import axios from 'axios';
import { env } from '@/config/env';
import { setupResponseInterceptor } from './interceptors/server.response.interceptor';

export const serverHttpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

setupResponseInterceptor(serverHttpClient);
