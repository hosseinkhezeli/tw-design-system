import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost } from '../api/like-post';
import { QUERY_KEYS } from '@/shared/config/query-keys';
import { updateFeedLike } from '../lib/feed-cache';

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,

    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.feed.all,
      });

      const previousFeed = queryClient.getQueryData(QUERY_KEYS.feed.list());

      queryClient.setQueryData(QUERY_KEYS.feed.list(), (old) =>
        updateFeedLike(old, postId),
      );

      return { previousFeed };
    },

    onError: (_err, _postId, ctx) => {
      queryClient.setQueryData(QUERY_KEYS.feed.list(), ctx?.previousFeed);
    },
  });
}
