'use client';
import { memo } from 'react';
import Image from 'next/image';
import type { FeedPost } from '../api/types';
import { useLikePost } from '../mutations/use-like-post';

type Props = {
  post: FeedPost;
};

export const PostCard = memo(function PostCard({ post }: Props) {
  const likeMutation = useLikePost();

  return (
    // استفاده از article برای هر موجودیت مستقل (پست)
    <article className='mb-6 overflow-hidden'>
      {/* هدر پست */}
      <header className='flex items-center gap-3 p-4'>
        <Image
          src={post.avatar}
          alt={`تصویر پروفایل ${post.username}`}
          width={40}
          height={40}
          className='size-10 rounded-full object-cover'
        />
        <h2 className='font-medium text-base'>{post.username}</h2>
      </header>

      {/* بخش اصلی محتوای بصری */}
      <figure className='relative w-full aspect-square'>
        <Image
          src={post.image}
          alt={`پست منتشر شده توسط ${post.username}`}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </figure>

      {/* فوتر پست */}
      <footer className='space-y-3 p-4'>
        <button
          type='button'
          onClick={() => likeMutation.mutate(post.id)}
          className='font-medium'
          aria-label={`لایک کردن پست. تعداد لایک‌های فعلی ${post.likes}`}
        >
          ❤️ {post.likes.toLocaleString()}
        </button>

        <p className='text-sm'>{post.caption}</p>
      </footer>
    </article>
  );
});
