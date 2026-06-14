import { useState } from 'react';
import { useQueryStates } from 'nuqs';

import { postSearchParams } from '../config/post.search-params';
import { QUERY_PARAM_KEYS } from '@/config/query-param-keys';
import { CREATE_POST_STEPS } from '../constants/post.constants';
import { MediaItem, CreatePostSchema } from '../schemas/create-post-schema';
import { ContentSource } from '../types/source.types';

export const useCreatePostFlow = () => {
  // ۱. مدیریت استیت‌های مبتنی بر URL
  const [params, setParams] = useQueryStates(postSearchParams);

  const currentSheet = params[QUERY_PARAM_KEYS.new_content_sheet];
  const currentStep = params[QUERY_PARAM_KEYS.new_content_step];

  const isOpen = currentSheet === 'true';

  // ۲. مدیریت استیت‌های محلی (Local State)
  const [selectedSource, setSelectedSource] = useState<ContentSource | null>(
    null,
  );
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  // ۳. اکشن‌های ناوبری (Navigation Actions)

  const handleSelectSource = (source: ContentSource) => {
    setSelectedSource(source);
    setParams((prev) => ({
      ...prev,
      [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.CONTENT,
    }));
  };
  const handleClose = () => {
    setParams({
      [QUERY_PARAM_KEYS.new_content_sheet]: null,
      [QUERY_PARAM_KEYS.new_content_step]: null,
    });
    // تاخیر برای اجرای انیمیشن بسته‌شدن مودال
    setTimeout(() => setSelectedMedia(null), 300);
  };

  const handleStepBack = () => {
    if (currentStep === CREATE_POST_STEPS.DETAILS) {
      setParams({
        [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.PREVIEW,
      });
    } else if (currentStep === CREATE_POST_STEPS.PREVIEW) {
      setParams({
        [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.SOURCE_SELECTION,
      });
    }
  };

  const handleSourceSelected = (media: MediaItem) => {
    setSelectedMedia(media);
    setParams((prev) => ({
      ...prev,
      [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.PREVIEW,
    }));
  };

  const handlePreviewConfirmed = (media: MediaItem) => {
    setSelectedMedia(media);
    setParams({
      [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.DETAILS,
    });
  };

  // ۴. اکشن نهایی (ارسال دیتا به سرور)
  const handlePublish = async (
    formValues: Pick<CreatePostSchema, 'caption'>,
  ) => {
    if (!selectedMedia) return;

    setIsPublishing(true);

    const payload: CreatePostSchema = {
      media: [selectedMedia], // فرستادن به صورت آرایه برای سازگاری با معماری آینده
      caption: formValues.caption,
    };

    try {
      // 🚀 در اینجا از useMutation که در فایل post.services نوشتید استفاده می‌کنید
      // await mutateAsync(payload);

      console.log('Publishing Payload:', payload);

      setTimeout(() => {
        setIsPublishing(false);
        handleClose(); // بستن موفقیت‌آمیز فلو
      }, 1500);
    } catch (error) {
      console.error('Failed to publish post:', error);
      setIsPublishing(false);
    }
  };

  return {
    // States
    isOpen,
    currentStep,
    selectedMedia,
    isPublishing,

    // Actions
    handleClose,
    handleStepBack,
    handleSourceSelected,
    handlePreviewConfirmed,
    handlePublish,
    handleSelectSource,
  };
};
