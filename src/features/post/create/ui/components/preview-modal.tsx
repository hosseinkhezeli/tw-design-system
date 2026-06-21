/* eslint-disable @next/next/no-img-element */
'use client';

import { IconX } from '@tabler/icons-react';

type Props = {
  open: boolean;
  src?: string;
  onClose: () => void;
};

export function PreviewModal({ open, src, onClose }: Props) {
  if (!open || !src) return null;

  return (
    <div
      className='animate-grow duration-75! fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md'
      onClick={onClose}
    >
      <div
        className='relative max-h-[90dvh] max-w-[95vw]'
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt='preview'
          className='max-h-[90dvh] rounded-xl object-contain shadow-2xl'
        />

        <button
          type='button'
          onClick={onClose}
          className='absolute -right-3 -top-3 rounded-full bg-foreground/10 p-2 backdrop-blur-md transition hover:bg-foreground/20'
        >
          <IconX className='h-4 w-4 text-background' />
        </button>
      </div>
    </div>
  );
}
