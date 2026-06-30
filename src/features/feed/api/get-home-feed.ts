import { FeedPaginationSchema } from '../schema/feed.schema';
import { FeedApi } from './feed.api';

export const getHomeFeed = async (payload: FeedPaginationSchema) => {
  const response = await FeedApi.get_home_feed(payload);
  return response;
};
