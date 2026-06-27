'use client';

import { useEffect, useRef } from 'react';
import { IconCheck, IconRefresh } from '@tabler/icons-react';

import { Button } from '@/shared/ui/button';

import { ACCEPTED_IMAGE_TYPES } from '@/entities/media/constants/media.constants';
import { MediaSelectButton } from '../components/media-select-button';
import { MediaPreviewThumbnail } from '../components/media-preview-thumbnail';
import { MediaSelectionResult } from '../../types/media-selection.types';

type Props = {
  media: MediaSelectionResult['media'];
  error?: string | null;
  handleSelectMedia: (files: File[]) => void;
  onClear: () => void;
  onConfirm: () => void;
};

export function MediaPickerForm({
  media,
  error,
  onClear,
  onConfirm,
  handleSelectMedia,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const latestMedia = media.at(-1);

  useEffect(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRePick = () => {
    onClear();
    fileInputRef.current?.click();
  };

  return (
    <div className='flex w-full flex-col gap-6 py-2'>
      <input
        ref={fileInputRef}
        type='file'
        multiple
        className='hidden'
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          handleSelectMedia([file]);
        }}
      />

      {!latestMedia ? (
        <MediaSelectButton onClick={handleRePick} />
      ) : (
        <MediaPreviewThumbnail
          handleClearMedia={handleRePick}
          thumbnailSrc={latestMedia.previewUrl}
        />
      )}

      {error && <p className='text-sm text-destructive'>{error}</p>}

      <div className='flex w-full items-center justify-between gap-4'>
        <Button type='button' className='flex-2' onClick={onConfirm}>
          <IconCheck className='mr-2 size-4' />
          تایید و ادامه
        </Button>

        <Button
          type='button'
          variant='outline'
          onClick={handleRePick}
          className='flex-1'
        >
          <IconRefresh className='ml-2 size-4' />
          انتخاب مجدد{' '}
        </Button>
      </div>
    </div>
  );
}
