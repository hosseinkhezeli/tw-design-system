'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/shared/components/ui/button';
import { MediaItem } from '../../schemas/create-post-schema';
import { IconCheck, IconRefresh } from '@tabler/icons-react';

type Props = {
  media: MediaItem;
  onConfirm: (media: MediaItem) => void;
  onRetake: () => void;
};

// فردا می‌توانی استیت‌هایی مثل filter: string یا crop: object را به این تایپ اضافه کنی
type PreviewFormValues = {
  media: MediaItem;
};

export const MediaPreviewForm = ({ media, onConfirm, onRetake }: Props) => {
  const { handleSubmit } = useForm<PreviewFormValues>({
    defaultValues: { media }, // مقدار اولیه فرم، همون عکسیه که از استپ قبل اومده
  });

  const onSubmit = (values: PreviewFormValues) => {
    // اینجا اگر فردا افکت یا کراپ روی عکس اعمال شد، روی values.media اعمال می‌شه
    onConfirm(values.media);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col h-full w-full'
    >
      {/* بخش نمایش و تعامل با عکس */}
      <div className='flex-1 relative'>
        <img
          src={media.previewUrl}
          alt='پیش‌نمایش تصویر'
          className='w-full h-full object-contain'
        />
        {/* جایگاه کامپوننت‌های آینده مثل <InstagramFilters /> */}
      </div>

      {/* کنترل‌های فرم */}
      <div className='flex items-center justify-between p-6 pb-12 bg-black border-t border-gray-800'>
        <Button
          type='button'
          variant='outline'
          onClick={onRetake}
          className='rounded-xl border-gray-700 text-white hover:bg-gray-800'
        >
          <IconRefresh className='size-4 ml-2' />
          تکرار عکس
        </Button>

        <Button
          type='submit'
          className='rounded-xl bg-white text-black hover:bg-gray-200'
        >
          تایید و ادامه
          <IconCheck className='size-4 mr-2' />
        </Button>
      </div>
    </form>
  );
};
