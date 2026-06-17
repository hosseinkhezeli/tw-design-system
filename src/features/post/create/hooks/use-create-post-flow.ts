/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { useQueryStates } from 'nuqs';

import { QUERY_PARAM_KEYS } from '@/config/query-param-keys';

import { useCreatePost } from './use-create-post';
import { useCreatePostStore } from '../models/create-post-store';
import { postSearchParams } from '../config/post.search-params';

import { useEffect, useState } from 'react';
import {
  MediaSelectionResult,
  MediaSelectionStep,
} from '@/features/media-selection/types/media-selection.types';

export const useCreatePostFlow = () => {
  const [params, setParams] = useQueryStates(postSearchParams);
  const [step, setStep] = useState<MediaSelectionStep | null>(null);
  const newContentSheetState = params[QUERY_PARAM_KEYS.new_content_sheet];
  const isOpen = newContentSheetState === 'true';
  const [mount, setMount] = useState<boolean>();
  const media = useCreatePostStore((state) => state.formData.media);
  const updateForm = useCreatePostStore((state) => state.updateForm);
  const resetForm = useCreatePostStore((state) => state.resetForm);

  const { mutateAsync: createPost, isPending: isPublishing } = useCreatePost();

  const handleMediaConfirm = ({ media }: MediaSelectionResult) => {
    updateForm({ media });
  };

  const handleChangeStep = (currentStep: MediaSelectionStep | null) => {
    return setStep(currentStep);
  };

  const handlePublish = async () => {
    if (!media.length) return;

    await createPost();
    handleClose();
  };

  const handleClose = () => {
    setParams({
      [QUERY_PARAM_KEYS.new_content_sheet]: null,
      [QUERY_PARAM_KEYS.new_content_step]: null,
    });
    handleChangeStep(null);
    resetForm();
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setMount(newContentSheetState === 'true');
      },
      newContentSheetState === 'true' ? 0 : 1000,
    );

    return () => clearTimeout(timeoutId);
  }, [newContentSheetState]);

  return {
    mount,
    isOpen,
    isPublishing,
    handleClose,
    handleMediaConfirm,
    handlePublish,
    handleChangeStep,
    step,
  };
};
