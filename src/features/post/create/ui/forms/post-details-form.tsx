'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { POST_CONSTANTS } from '@/entities/post';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { useCreatePostStore } from '../../models/create-post-store';
import { NewPostThumbnail } from '@/features/post/create/ui/components/new-post-thumbnail/new-post-thumbnail';
import {
  CreatePostDto,
  CreatePostSchema,
} from '../../schemas/create-post.schema';

type FormValues = Pick<CreatePostDto, 'caption'>;

export const PostDetailsForm = () => {
  const caption = useCreatePostStore((state) => state.formData.caption);
  const media = useCreatePostStore((state) => state.formData.media);
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

  const latestMedia = media?.[0] ?? { previewUrl: '/next.svg' };
  const watchedCaption = watch('caption');

  useEffect(() => {
    updateForm({
      caption: watchedCaption ?? '',
    });
  }, [watchedCaption, updateForm]);

  const handleFormSubmit = () => {
    console.log('handle-form-submit');
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex w-full flex-col gap-6 py-2'
    >
      {latestMedia && (
        <NewPostThumbnail
          media={latestMedia}
          upload='IN_PROGRESS'
          error={undefined}
        />
      )}

      <div className='flex-1 space-y-1'>
        <Textarea
          placeholder='کپشن پست خود را بنویسید...'
          disabled={false}
          className='resize-none min-h-60 border-none! ring-0! outline-0! bg-transparent! max-h-[70svh]'
          {...register('caption')}
          maxLength={POST_CONSTANTS.MAX_CAPTION_LENGTH}
        />

        {errors.caption && (
          <span className='text-xs text-red-500'>{errors.caption.message}</span>
        )}
      </div>

      <div className='mt-auto '>
        <Button type='submit' className='w-full' disabled={false}>
          {false ? 'در حال انتشار...' : 'انتشار پست'}
        </Button>
      </div>
    </form>
  );
};
