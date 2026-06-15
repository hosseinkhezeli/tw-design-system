'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';

import { IconCheck, IconRefresh } from '@tabler/icons-react';
import { useCreatePostStore } from '../../models/create-post-store';

export type PreviewFormValues = {
  rotation: number;
  filter: string;
};

type Props = {
  onConfirm: (values: PreviewFormValues) => void;
  onRetake: () => void;
};

export const MediaPreviewForm = ({ onConfirm, onRetake }: Props) => {
  const media = useCreatePostStore((state) => state.formData.media);

  const { handleSubmit } = useForm<PreviewFormValues>({
    defaultValues: {
      rotation: 0,
      filter: 'none',
    },
  });

  const onSubmit = (values: PreviewFormValues) => {
    onConfirm(values);
  };

  console.log({ media });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-full w-full flex-col'
    >
      <div className='relative flex-1'>
        <img
          src={media?.[0]?.previewUrl}
          alt='پیش‌نمایش تصویر'
          className='h-full w-full object-contain'
        />

        {/*
          Future:
          Cropper
          Filters
          Rotation
          Adjustments
        */}
      </div>

      <div className='flex items-center justify-between w-full gap-4'>
        <Button type='submit' className='flex-2'>
          تایید و ادامه
          <IconCheck className='mr-2 size-4' />
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
};
