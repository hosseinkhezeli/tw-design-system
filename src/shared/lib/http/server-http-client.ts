import axios from 'axios';
import { cookies } from 'next/headers';
import { env } from '@/config/env';

export const serverHttpClient = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const instance = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return instance;
};
