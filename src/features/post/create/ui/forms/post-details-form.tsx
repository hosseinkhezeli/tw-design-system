'use client';

import { POST_VISIBILITY, POST_CONSTANTS } from '@/entities/post';
import { Button } from '@/shared/components/ui/button';
import { TextInput } from '@/shared/components/ui/text-input';
import { TextareaInput } from '@/shared/components/ui/textarea-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreatePostStore } from '../../models/create-post-store';
import {
  CreatePostDto,
  createPostSchema,
} from '../../schemas/create-post.schema';
import { NewPostThumbnail } from '../components/new-post-thumbnail';
import { TagInput } from '@/shared/components/ui/tag-input';

export const PostDetailsForm = () => {
  const { caption, title, hashtags, media, visibility } = useCreatePostStore(
    (state) => state.formData,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostDto>({
    resolver: zodResolver(createPostSchema),
    mode: 'onBlur',
    defaultValues: {
      caption,
      title,
      hashtags,
      visibility,
    },
  });

  const latestMedia = media?.[0] ?? { previewUrl: '/next.svg' };

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

      <div className='space-y-1'>
        <TextInput
          register={register}
          name='title'
          label='عنوان پست'
          className='bg-transparent! border-0! placeholder:text-base! text-base! ring-0! outline-0!'
        />
        <TextareaInput
          register={register}
          name='caption'
          label='کپشن پست خود را بنویسید...'
          disabled={false}
          className='resize-none min-h-48 border-none! placeholder:text-xs! ring-0! outline-0! bg-transparent! max-h-60'
          maxLength={POST_CONSTANTS.MAX_CAPTION_LENGTH}
        />

        <TagInput
          register={register}
          name='hashtags'
          placeholder='هشتگ‌ها را وارد کنید'
          error={errors.hashtags?.message}
        />
      </div>

      <Button type='submit' className='w-full' disabled={false}>
        {false ? 'در حال انتشار...' : 'انتشار پست'}
      </Button>
    </form>
  );
};
