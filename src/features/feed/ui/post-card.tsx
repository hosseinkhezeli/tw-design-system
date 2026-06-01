'use client';
import { memo } from 'react';

import type { FeedPost } from '../api/types';
import { useLikePost } from '../mutations/use-like-post';

type Props = {
  post: FeedPost;
};

export const PostCard = memo(function PostCard({ post }: Props) {
  const likeMutation = useLikePost();

  return (
    <article className='mb-6 overflow-hidden '>
      <header className='flex items-center gap-3 p-4'>
        <img
          src={post.avatar}
          alt={post.username}
          className='size-10 rounded-full'
        />

        <span className='font-medium'>{post.username}</span>
      </header>

      <img
        src={post.image}
        alt=''
        loading='lazy'
        decoding='async'
        className='w-full'
      />

      <div className='space-y-3 p-4'>
        <button
          type='button'
          onClick={() => likeMutation.mutate(post.id)}
          className='font-medium'
        >
          ❤️ {post.likes.toLocaleString()}
        </button>

        <p>{post.caption}</p>
      </div>
    </article>
  );
});
