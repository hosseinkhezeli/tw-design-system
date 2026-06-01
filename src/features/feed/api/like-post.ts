import { mockLikePost } from '../mocks/feed.mock';

export async function likePost(postId: string) {
  return mockLikePost(postId);
}
