// src/features/post/ui/forms/post-details-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { CreatePostSchema, createPostSchema } from '../../schemas/create-post-schema';

type FormValues = Pick<CreatePostSchema, 'caption'>;

type Props = {
  mediaPreviewUrl?: string;
  isPending?: boolean;
  onSubmit: (values: FormValues) => void;
};

export const PostDetailsForm = ({
  mediaPreviewUrl,
  isPending,
  onSubmit,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createPostSchema.pick({ caption: true })),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-6 h-full'
    >
      {mediaPreviewUrl && (
        <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100'>
          <div className='w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-black'>
            <img
              src={mediaPreviewUrl}
              alt='تصویر انتخابی'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='text-sm text-gray-500'>
            <p>آماده انتشار</p>
          </div>
        </div>
      )}

      {/* فقط فیلد کپشن */}
      <div className='flex-1 space-y-1'>
        <Textarea
          placeholder='کپشن پست خود را بنویسید... (اختیاری)'
          {...register('caption')}
          className='min-h-[200px] resize-none bg-white placeholder:text-gray-400 text-base'
          disabled={isPending}
        />
        {errors.caption && (
          <span className='text-xs text-red-500'>{errors.caption.message}</span>
        )}
      </div>

      <div className='pt-4 mt-auto border-t border-gray-100'>
        <Button type='submit' className='w-full' disabled={isPending}>
          {isPending ? 'در حال انتشار...' : 'انتشار پست'}
        </Button>
      </div>
    </form>
  );
};
