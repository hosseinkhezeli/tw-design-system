'use client';

import { useCreatePostFlow } from '../../hooks/use-create-post-flow';
import { MEDIA_SELECTION_STEP } from '@/features/media-selection/constants/media-selection.constants';
import { PostDetailsFormSheet } from '../sheet/post-details-form-sheet';
import { PostMediaSelectionSheet } from '../sheet/post-media-selection-sheet';

export const CreatePostContainer = () => {
  const {
    mount,
    isOpen,
    isPublishing,
    handleClose,
    handlePublish,
    handleMediaConfirm,
    handleChangeStep,
    step,
  } = useCreatePostFlow();
  if (mount)
    return (
      <>
        <PostMediaSelectionSheet
          fullScreen={step !== null}
          onClose={handleClose}
          isOpen={isOpen}
          onConfirm={handleMediaConfirm}
          getCurrentStep={handleChangeStep}
        />

        <PostDetailsFormSheet
          isOpen={step === MEDIA_SELECTION_STEP.READY}
          onClose={handleClose}
        />
      </>
    );
};
