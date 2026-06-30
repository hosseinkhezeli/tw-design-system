/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostModel } from '../../model/post.model';
import { Typography } from '@/shared/ui/typography';
import Img from '@/shared/ui/img';
import { ReactNode } from 'react';

type Props = {
  post: any;
  imageAspectRatio: number;
  imageHeight: number;

  // Slots for cross-slice composition
  authorSlot: ReactNode;
  actionSlot: ReactNode;
};

export function PostCardMasonry({
  post,
  imageAspectRatio,
  imageHeight,
  authorSlot,
  actionSlot,
}: Props) {
  const { post: normalizedPost } = new PostModel(post);

  return (
    <article className='flex flex-col w-full h-max rounded-sm overflow-hidden my-1'>
      <Img
        src={normalizedPost?.media?.[0]?.thumbnailUrl ?? ''}
        alt={normalizedPost?.media?.[0]?.altText ?? ''}
        style={{ aspectRatio: imageAspectRatio }}
        width={250}
        height={imageHeight}
        className='w-full object-contain bg-accent/50'
      />

      <div className='flex flex-col w-full p-2 '>
        <header>
          {normalizedPost?.title && (
            <Typography as='h2'>{normalizedPost?.title}</Typography>
          )}
        </header>

        {normalizedPost?.caption && (
          <Typography variant={'caption'} className='opacity-75'>
            {normalizedPost?.caption}
          </Typography>
        )}

        <footer className='flex items-center justify-between mt-2 gap-2'>
          {/* Inject the Feature */}
          {actionSlot}

          {/* Inject the User Entity */}
          {authorSlot}
        </footer>
      </div>
    </article>
  );
}
