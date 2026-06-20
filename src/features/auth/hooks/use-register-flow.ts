// use-register-flow.ts

'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { MediaItem } from '@/entities/media';
import { MediaService } from '@/entities/media/lib/media.service';

import { useRegister } from '@/features/auth/mutations/use-register';
import { RegisterFormValues } from '@/features/auth/schemas/register.schema';
import { useUploadMedia } from '@/features/media-selection/mutations/use-upload-media';

import { navigation } from '@/shared/services/navigation';

export const useRegisterFlow = () => {
  const media = new MediaService();

  const [mediaItem, setMediaItem] = useState<MediaItem | null>(null);

  const { mutateAsync: uploadMediaFn, isPending: isUploading } =
    useUploadMedia();

  const { mutateAsync: registerFn, isPending: isRegistring } = useRegister();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const avatarMediaItem = data.avatar
        ? media.createMediaItem(data.avatar)
        : null;

      let finalMediaId = mediaItem?.mediaId;

      if (mediaItem?.file && !mediaItem.mediaId) {
        toast.loading('در حال آپلود تصویر...', {
          id: 'auth-flow',
        });

        const uploadResult = await uploadMediaFn({
          file: mediaItem.file,
        });

        finalMediaId = uploadResult?.data?.mediaId;

        setMediaItem({
          ...avatarMediaItem!,
          mediaId: finalMediaId,
        });
      }

      toast.loading('در حال ایجاد حساب کاربری...', {
        id: 'auth-flow',
      });

      await registerFn({
        full_name: data.full_name,
        avatar_media_id: finalMediaId,
        username: data.username,
      });

      toast.success('عضویت با موفقیت انجام شد! 🌟', {
        id: 'auth-flow',
      });

      navigation.goToProfileMe();
    } catch (error) {
      console.error(error);

      toast.error('خطایی رخ داد. لطفا دوباره تلاش کنید.', {
        id: 'auth-flow',
        description:
          error instanceof Error ? error.message : 'مشکل در برقراری ارتباط',
      });
    }
  };

  const currentHeader = {
    title: 'عضویت 🌟',
    subtitle: 'مشخصات خودت رو برای شروع وارد کن.',
  };

  return {
    currentHeader,
    onSubmit,
    isUploading,
    isRegistring,
  };
};
