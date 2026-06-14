/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/shared/components/ui/button';
import {
  MediaItem,
  MediaItemFormValues,
  mediaItemSchema,
} from '../../schemas/create-post-schema';
import { ACCEPTED_IMAGE_TYPES } from '../../constants/post.constants';
import { IconCloudUpload, IconX } from '@tabler/icons-react';

type MediaPickerFormProps = {
  onSubmit: (values: MediaItem) => void;
  isPending?: boolean;
};

export const MediaPickerForm = ({
  onSubmit,
  isPending = false,
}: MediaPickerFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<MediaItemFormValues>({
    resolver: zodResolver(mediaItemSchema),
    defaultValues: {
      type: 'IMAGE',
      previewUrl: '',
    },
  });

  const file = watch('file');

  // Trigger file uploader immediately upon component mount
  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    setValue('previewUrl', url, {
      shouldValidate: false,
    });

    return () => URL.revokeObjectURL(url);
  }, [file, setValue]);

  const handleFormSubmit = (values: MediaItemFormValues) => {
    onSubmit({ ...values, type: 'IMAGE' });
    reset();
    setPreviewUrl(null);
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering file dialog when clicking remove
    setValue('file', undefined as any, { shouldValidate: true });
    setPreviewUrl(null);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex w-full flex-col gap-6'
    >
      <div className='space-y-2'>
        {/* Hidden Native Input */}
        <input
          ref={fileInputRef}
          id='media'
          type='file'
          className='hidden'
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setValue('file', file, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />

        {/* Customized Visual Upload Dropzone / Button */}
        {!previewUrl ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className='flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 bg-secondary/20 hover:bg-secondary/40 transition rounded-xl p-8 cursor-pointer gap-3 min-h-[200px]'
          >
            <div className='p-3 bg-background rounded-full shadow-sm text-muted-foreground'>
              <IconCloudUpload className='w-6 h-6' />
            </div>
            <div className='text-center space-y-1'>
              <p className='text-sm font-medium'>برای آپلود عکس کلیک کنید</p>
              <p className='text-xs text-muted-foreground'>
                فرمت‌های مجاز: JPG, PNG, WEBP
              </p>
            </div>
          </div>
        ) : (
          /* Preview State with a Clear Action Button */
          <div className='relative overflow-hidden rounded-xl border border-border bg-muted/30 aspect-square w-full max-h-[350px] flex items-center justify-center'>
            <img
              src={previewUrl}
              alt='Preview'
              className='w-full h-full object-contain'
            />
            <button
              type='button'
              onClick={handleClearFile}
              className='absolute top-3 right-3 p-2 bg-background/80 hover:bg-background text-destructive backdrop-blur-sm rounded-full shadow-md transition'
            >
              <IconX className='w-4 h-4' />
            </button>
          </div>
        )}

        {errors.file && (
          <p className='text-sm text-destructive font-medium mt-1'>
            {errors.file.message}
          </p>
        )}
      </div>

      <Button
        type='submit'
        className='w-full'
        isLoading={isSubmitting || isPending}
        disabled={isSubmitting || isPending || !file}
      >
        {isSubmitting || isPending ? 'در حال آپلود...' : 'تایید و آپلود رسانه'}
      </Button>
    </form>
  );
};
