/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { useEffect, useRef, useState } from 'react';

import { MAX_BIO_CHARACTERS_REVEAL } from '@/shared/config/ui';
import { formatBio } from '../../lib/format-bio';

import { typographyVariants } from '@/shared/ui/typography/variants';
import { cn } from '@/shared/utils';

type Props = {
  bio?: string;
};

export function UserBio({ bio }: Props) {
  const [contentHeight, setContentHeight] = useState(28);
  const contentRef = useRef<HTMLDivElement>(null);
  const formattedBio = formatBio(bio);
  const shouldTruncate = formattedBio?.length > MAX_BIO_CHARACTERS_REVEAL;
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (contentRef.current && expanded) {
      setContentHeight(contentRef.current.scrollHeight ?? 28);
    }
  }, [expanded, bio, formattedBio]);

  useEffect(() => {
    setExpanded(!shouldTruncate);
  }, [shouldTruncate]);
  return (
    <div className='text-[15px] min-h-7 leading-7 text-foreground'>
      <div
        ref={contentRef}
        style={{
          maxHeight: expanded ? `${contentHeight}px` : '80px',
        }}
        dangerouslySetInnerHTML={{ __html: formattedBio }}
        className={cn(
          typographyVariants({ variant: 'body' }),
          'overflow-hidden transition-all duration-300 ease-out',
        )}
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
