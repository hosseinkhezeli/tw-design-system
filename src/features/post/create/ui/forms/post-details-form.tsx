'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreatePostDto } from '@/entities/post';
import { CreatePostSchema } from '@/entities/post';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { useCreatePostStore } from '../../models/create-post-store';

type FormValues = Pick<CreatePostDto, 'caption'>;

type Props = {
  mediaPreviewUrl?: string;
  isPending?: boolean;
  onSubmit: () => void;
};

export const PostDetailsForm = ({
  mediaPreviewUrl,
  isPending = false,
  onSubmit,
}: Props) => {
  const caption = useCreatePostStore((state) => state.formData.caption);

  const updateForm = useCreatePostStore((state) => state.updateForm);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(
      CreatePostSchema.pick({
        caption: true,
      }),
    ),
    defaultValues: {
      caption,
    },
  });

  const watchedCaption = watch('caption');

  useEffect(() => {
    updateForm({
      caption: watchedCaption ?? '',
    });
  }, [watchedCaption, updateForm]);

  const handleFormSubmit = () => {
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex h-full flex-col gap-6'
    >
      {mediaPreviewUrl && (
        <div className='flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4'>
          <div className='h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black'>
            <img
              src={mediaPreviewUrl}
              alt='تصویر انتخابی'
              className='h-full w-full object-cover'
            />
          </div>

          <div className='text-sm text-gray-500'>
            <p>آماده انتشار</p>
          </div>
        </div>
      )}

      <div className='flex-1 space-y-1'>
        <Textarea
          placeholder='کپشن پست خود را بنویسید...'
          disabled={isPending}
          className='min-h-[200px] resize-none bg-white text-base placeholder:text-gray-400'
          {...register('caption')}
        />

        {errors.caption && (
          <span className='text-xs text-red-500'>{errors.caption.message}</span>
        )}
      </div>

      <div className='mt-auto border-t border-gray-100 pt-4'>
        <Button type='submit' className='w-full' disabled={isPending}>
          {isPending ? 'در حال انتشار...' : 'انتشار پست'}
        </Button>
      </div>
    </form>
  );
};
