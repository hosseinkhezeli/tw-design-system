import { httpClient } from '@/shared/lib/http/http-client';
import { FeedPaginationSchema } from '../schema/feed.schema';
import { FeedResponse } from '../types/feed.types';
import { routes } from '../config/api.routes';
import { feedMocks } from '../mock/feed.mock';

const IS_DEV = true;
const delay = (ms: number = 2000) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export const FeedApi = {
  get_home_feed: async (
    payload: FeedPaginationSchema,
  ): Promise<FeedResponse> => {
    if (IS_DEV) {
      await delay();
      const response = feedMocks.get_home_feed(payload);
      return response;
    }
    return (
      await httpClient.get<FeedResponse>(routes.get_home_feed, {
        params: payload,
      })
    ).data;
  },
} as const;
