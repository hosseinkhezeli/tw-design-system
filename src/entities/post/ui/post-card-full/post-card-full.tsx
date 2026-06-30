/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, type ReactNode } from 'react';

import { PostModel } from '../../model/post.model';
import { Typography } from '@/shared/ui/typography';

type Props = {
  post: any;
  authorSlot: ReactNode;
  actionSlot: ReactNode;
  mediaSlot: ReactNode;
};

const TITLE_PREVIEW_LENGTH = 60;

export function PostCardFull({
  post,
  authorSlot,
  actionSlot,
  mediaSlot,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const { post: normalizedPost } = new PostModel(post);

  const title = normalizedPost?.title?.trim() ?? '';
  const caption = normalizedPost?.caption?.trim() ?? '';

  const hasTitle = Boolean(title);
  const hasCaption = Boolean(caption);

  const shouldCollapseTitle = hasTitle && title.length > TITLE_PREVIEW_LENGTH;

  const shouldShowExpandButton = shouldCollapseTitle || hasCaption;

  const visibleTitle =
    expanded || !shouldCollapseTitle
      ? title
      : `${title.slice(0, TITLE_PREVIEW_LENGTH)}...`;

  return (
    <article className='flex flex-col w-full rounded-sm overflow-hidden'>
      <div className='flex px-2 py-3'>{authorSlot}</div>

      {mediaSlot}

      <div className='flex flex-col w-full p-2'>
        <footer className='flex items-center justify-between mb-2 gap-2'>
          {actionSlot}
        </footer>

        {(hasTitle || (expanded && hasCaption)) && (
          <header className='space-y-1'>
            {hasTitle && <Typography as='h2'>{visibleTitle}</Typography>}

            {expanded && hasCaption && (
              <Typography variant='caption' className='opacity-75'>
                {caption}
              </Typography>
            )}
          </header>
        )}

        {shouldShowExpandButton && (
          <button
            type='button'
            onClick={() => setExpanded((v) => !v)}
            className='self-start text-xs opacity-70 hover:opacity-100 mt-1'
          >
            {expanded ? 'کمتر...' : 'بیشتر...'}
          </button>
        )}
      </div>
    </article>
  );
}
