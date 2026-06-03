'use client';
import { useEffect, useRef, useState } from 'react';
import { formatBio } from '../lib/format-bio';
import { MAX_BIO_CHARACTERS_REVEAL } from '@/config/ui';

type Props = {
  bio: string;
};

export function BioDescription({ bio }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const formattedBio = formatBio(bio);
  const shouldTruncate = bio.length > MAX_BIO_CHARACTERS_REVEAL;

  useEffect(() => {
    if (contentRef.current && expanded) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded, bio]);

  if (!bio?.trim()) return null;

  return (
    <div className='text-[15px] leading-7 text-foreground'>
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
