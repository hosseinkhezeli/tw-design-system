import { useMutation, useQueryClient } from '@tanstack/react-query';

import { likePost } from '../api/like-post';
import type { FeedPage } from '../api/types';

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,

    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: ['feed'],
      });

      const previousFeed = queryClient.getQueryData(['feed']);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(['feed'], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,

          pages: oldData.pages.map((page: FeedPage) => ({
            ...page,

            items: page.items.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    likes: post.likes + 1,
                  }
                : post,
            ),
          })),
        };
      });

      return { previousFeed };
    },

    onError: (_error, _postId, context) => {
      queryClient.setQueryData(['feed'], context?.previousFeed);
    },
  });
}
