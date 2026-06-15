'use client';
import { useEffect, useRef, useState } from 'react';

import { MAX_BIO_CHARACTERS_REVEAL } from '@/config/ui';
import { formatBio } from '../../lib/format-bio';

type Props = {
  bio?: string;
};

export function UserBio({ bio }: Props) {
  const [contentHeight, setContentHeight] = useState(28);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const formattedBio = formatBio(bio);
  const shouldTruncate = formattedBio?.length > MAX_BIO_CHARACTERS_REVEAL;

  useEffect(() => {
    if (contentRef.current && expanded) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded, bio, formattedBio]);

  if (!bio?.trim()) return null;

  return (
    <div className='text-[15px] min-h-7 leading-7 text-foreground'>
      <div
        ref={contentRef}
        className='overflow-hidden transition-all duration-300 ease-out'
        style={{
          maxHeight: expanded ? `${contentHeight}px` : '80px',
        }}
        dangerouslySetInnerHTML={{ __html: formattedBio }}
      />

      {shouldTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          className='mt-1 font-semibold text-primary hover:text-primary/80 active:opacity-70 transition-colors'
        >
          {expanded ? 'بستن' : 'بیشتر'}
        </button>
      )}
    </div>
  );
}
