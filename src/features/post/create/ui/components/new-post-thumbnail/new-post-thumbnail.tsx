/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import {
  IconX,
  IconAlertCircle,
  IconCheck,
  IconPhoto,
} from '@tabler/icons-react';
import { MediaItem } from '@/entities/media';
import { UPLOAD_PROCESS } from '@/entities/media/constants/media.constants';
import { UploadingProcess } from '@/entities/media/types/media.types';
import { Spinner } from '@/shared/components/ui/spinner';
import { cn } from '@/shared/utils';

type Props = {
  media: MediaItem;
  upload: UploadingProcess;
  error?: { message?: string };
};

export function NewPostThumbnail({ media, upload, error }: Props) {
  const [open, setOpen] = useState(false);

  const isUploading = upload === UPLOAD_PROCESS.IN_PROGRESS;
  const isError = upload === UPLOAD_PROCESS.ERROR;
  const isSuccess = upload === UPLOAD_PROCESS.SUCCEED;
  const isIdle = upload === UPLOAD_PROCESS.NOT_STARTED;

  return (
    <>
      {/* Thumbnail */}
      <div
        onClick={() => media.previewUrl && setOpen(true)}
        className='group flex items-center gap-4 p-4'
      >
        {/* Media */}
        <div className='relative aspect-9/16 h-auto w-16 shrink-0 overflow-hidden rounded-lg '>
          {media.previewUrl ? (
            <img
              src={media.previewUrl}
              alt='media'
              className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center'>
              <IconPhoto size={18} />
            </div>
          )}

          <div
            className={cn(
              'absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition',
              isUploading && 'opacity-100',
            )}
          />
          {isUploading && (
            <span className='absolute top-1/2 left-1/2 -translate-1/2 flex items-center gap-2'>
              <Spinner />
            </span>
          )}
          {/* Hover overlay */}
        </div>

        {/* Status */}
        <div className='text-xs text-white/80'>
          {isIdle && <p>آماده بارگذاری</p>}

          {isUploading && (
            <p className='flex items-center gap-2'>در حال آپلود...</p>
          )}

          {isSuccess && (
            <p className='flex items-center gap-2 text-green-400'>
              <IconCheck className='h-3 w-3' />
              آپلود موفق
            </p>
          )}

          {isError && (
            <p className='flex items-center gap-2 text-red-400'>
              <IconAlertCircle className='h-3 w-3' />
              خطا در آپلود
            </p>
          )}

          {error?.message && (
            <p className='mt-1 text-[10px] text-red-300'>{error.message}</p>
          )}
        </div>
      </div>

      {/* Fullscreen Preview (no libs) */}
      {open && (
        <div
          className='
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/80 backdrop-blur-md
            transition-opacity duration-300
          '
          onClick={() => setOpen(false)}
        >
          <div
            className='
              relative max-h-[90vh] max-w-[95vw]
              transition-transform duration-300
              scale-100
            '
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={media.previewUrl}
              alt='preview'
              className='max-h-[90vh] rounded-xl object-contain shadow-2xl'
            />

            <button
              onClick={() => setOpen(false)}
              className='
                absolute -top-3 -right-3
                rounded-full bg-white/10 p-2
                backdrop-blur-md
                hover:bg-white/20 transition
              '
            >
              <IconX className='h-4 w-4 text-white' />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
