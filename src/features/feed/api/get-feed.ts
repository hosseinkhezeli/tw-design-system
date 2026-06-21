import { getMockFeed } from '../mocks/feed.mock';
import { FeedPage } from './types';

export async function getFeed(cursor: string | null): Promise<FeedPage> {
  return await getMockFeed(cursor);
}
