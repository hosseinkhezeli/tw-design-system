'use client';

import { useForm } from 'react-hook-form';
import { IconCheck, IconRefresh } from '@tabler/icons-react';

import { Button } from '@/shared/components/ui/button';
import { MediaSelectionResult } from '../../types/media-selection.types';
import { MediaPreviewThumbnail } from '../components/media-preview-thumbnail';

export type PreviewFormValues = {
  rotation: number;
  filter: string;
};

type Props = {
  media: MediaSelectionResult['media'];
  onConfirm: (values: PreviewFormValues) => void;
  onRetake: () => void;
};

export function CapturedMediaPreviewForm({
  media,
  onConfirm,
  onRetake,
}: Props) {
  const { handleSubmit } = useForm<PreviewFormValues>({
    defaultValues: {
      rotation: 0,
      filter: 'none',
    },
  });

  const onSubmit = (values: PreviewFormValues) => {
    onConfirm(values);
  };

  const latestMedia = media.at(-1);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full flex-col gap-6 py-2'
    >
      <MediaPreviewThumbnail
        handleClearMedia={onRetake}
        thumbnailSrc={latestMedia?.previewUrl}
      />

      <div className='flex w-full items-center justify-between gap-4'>
        <Button className='flex-2' type='submit'>
          <IconCheck className='mr-2 size-4' />
          تایید و ادامه
        </Button>

        <Button
          type='button'
          variant='outline'
          onClick={onRetake}
          className='flex-1'
        >
          <IconRefresh className='ml-2 size-4' />
          عکس مجدد
        </Button>
      </div>
    </form>
  );
}
