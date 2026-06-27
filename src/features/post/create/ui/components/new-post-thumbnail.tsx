/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { IconPhoto } from '@tabler/icons-react';

import { MediaItem } from '@/entities/media';
import { UPLOAD_PROCESS } from '@/entities/media/constants/media.constants';
import { UploadingProcess } from '@/entities/media/types/media.types';

import { cn } from '@/shared/utils';

import { Spinner } from '@/shared/ui/spinner';

import { THUMBNAIL_STATUS } from '../../constants/post.constants';
import { PreviewModal } from './preview-modal';
import { UploadStatus } from './upload-status';

type Props = {
  media: MediaItem;
  upload: UploadingProcess;
  error?: { message?: string };
};

export function NewPostThumbnail({ media, upload, error }: Props) {
  const [open, setOpen] = useState(false);

  const isUploading = upload === UPLOAD_PROCESS.IN_PROGRESS;
  const status = THUMBNAIL_STATUS[upload];

  return (
    <>
      <div
        className='group flex items-center gap-4 p-4'
        onClick={() => media.previewUrl && setOpen(true)}
      >
        <div className='relative aspect-9/16 w-16 shrink-0 overflow-hidden rounded-lg'>
          {media.previewUrl ? (
            <img
              src={media.previewUrl}
              alt='media'
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center'>
              <IconPhoto size={18} />
            </div>
          )}

          <div
            className={cn(
              'absolute inset-0 bg-foreground/20 transition-opacity',
              isUploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
            )}
          />

          {isUploading && (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Spinner />
            </div>
          )}
        </div>

        <UploadStatus status={status} errorMessage={error?.message} />
      </div>

      <PreviewModal
        open={open}
        src={media.previewUrl}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
