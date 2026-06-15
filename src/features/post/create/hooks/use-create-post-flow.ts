/* eslint-disable react-hooks/set-state-in-effect */
import { useQueryStates } from 'nuqs';

import { QUERY_PARAM_KEYS } from '@/config/query-param-keys';

import { useCreatePost } from './use-create-post';
import { useCreatePostStore } from '../models/create-post-store';

import { postSearchParams } from '../config/post.search-params';
import { CREATE_POST_STEPS, POST_SOURCE } from '../constants/post.constants';

import type { PostSource } from '../types/create-post.types';
import { useState } from 'react';

export const useCreatePostFlow = () => {
  const [params, setParams] = useQueryStates(postSearchParams);

  const media = useCreatePostStore((state) => state.formData.media);

  const resetForm = useCreatePostStore((state) => state.resetForm);

  const [postSource, setPostSource] = useState<PostSource | null>();

  const currentSheet = params[QUERY_PARAM_KEYS.new_content_sheet];

  const currentStep = params[QUERY_PARAM_KEYS.new_content_step];

  const isOpen = currentSheet === 'true';

  const { mutateAsync: createPost, isPending: isPublishing } = useCreatePost();

  const handleStepBack = () => {
    switch (currentStep) {
      case CREATE_POST_STEPS.DETAILS:
        setParams({
          [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.PREVIEW,
        });
        break;

      case CREATE_POST_STEPS.PREVIEW:
        setParams({
          [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.CONTENT,
        });
        break;

      case CREATE_POST_STEPS.CONTENT:
        setPostSource(null);
        setParams({
          [QUERY_PARAM_KEYS.new_content_step]:
            CREATE_POST_STEPS.SOURCE_SELECTION,
        });
        break;
    }
  };

  const handleSelectSource = (_source: PostSource) => {
    setPostSource(_source);
    setParams({
      [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.CONTENT,
    });
  };

  const handleSourceSelected = () => {
    setParams({
      [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.PREVIEW,
    });
  };

  const handlePreviewConfirmed = () => {
    setParams({
      [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.DETAILS,
    });
  };

  const handlePublish = async () => {
    if (!media) return;
    await createPost();

    handleClose();
  };

  const handleClose = () => {
    setParams({
      [QUERY_PARAM_KEYS.new_content_sheet]: null,
      [QUERY_PARAM_KEYS.new_content_step]: null,
    });
    setPostSource(null);
    resetForm();
  };

  const handleRetake = () => {
    setPostSource(POST_SOURCE.CAMERA);
    setParams({
      [QUERY_PARAM_KEYS.new_content_step]: CREATE_POST_STEPS.CONTENT,
    });
    resetForm();
  };

  return {
    isOpen,
    currentStep,
    postSource,

    isPublishing,

    handleClose,
    handleStepBack,
    handleSelectSource,
    handleSourceSelected,
    handlePreviewConfirmed,
    handlePublish,
    handleRetake,
  };
};
