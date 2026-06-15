'use client';

import { Button } from '@/shared/components/ui/button';
import { ACCEPTED_IMAGE_TYPES } from '../../constants/post.constants';
import { useMediaSelection } from '../../hooks/use-media-selection';
import { useEffect } from 'react';
import { MediaSelectButton } from '../components/media-select-button';
import { MediaPreviewThumbnail } from '../components/media-preview-thumbnail';
import { IconRefresh, IconCheck } from '@tabler/icons-react';

type Props = {
  onMediaSelected?: () => void;
  onConfirm: () => void;
};

export const MediaPickerForm = ({ onMediaSelected, onConfirm }: Props) => {
  const {
    media,
    error,
    fileInputRef,
    handleFileChange,
    triggerFileInput,
    removeMedia,
  } = useMediaSelection();

  const latestMedia = media.at(-1);

  useEffect(() => {
    triggerFileInput();
  }, [triggerFileInput]);

  return (
    <div className='flex w-full flex-col gap-6'>
      <input
        ref={fileInputRef}
        type='file'
        multiple
        className='hidden'
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        onChange={(event) => {
          handleFileChange(event);

          if (event.target.files?.length) {
            onMediaSelected?.();
          }
        }}
      />

      {!latestMedia ? (
        <MediaSelectButton onClick={triggerFileInput} />
      ) : (
        <MediaPreviewThumbnail
          handleClearMedia={removeMedia}
          thumbnailSrc={latestMedia.previewUrl}
        />
      )}

      {error && <p className='text-sm text-destructive'>{error}</p>}
      <div className='flex items-center justify-between w-full gap-4'>
        <Button type='submit' className='flex-2'>
          تایید و ادامه
          <IconCheck className='mr-2 size-4' />
        </Button>
        <Button
          type='button'
          variant='outline'
          onClick={triggerFileInput}
          className='flex-1'
        >
          <IconRefresh className='ml-2 size-4' />
          انتخاب فایل جدید
        </Button>
      </div>
    </div>
  );
};
