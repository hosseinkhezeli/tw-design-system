import { createSerializer } from 'nuqs';
import { postSearchParams } from '@/features/post/config/post.search-params';

export const appSearchParams = {
  ...postSearchParams,
};

export const buildUrl = createSerializer(appSearchParams);
