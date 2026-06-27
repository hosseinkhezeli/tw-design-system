'use client';

import { useEffect } from 'react';
import { StepTransition } from '@/shared/ui/transitions/step-transition';
import { MEDIA_SELECTION_STEP } from '@/features/media-selection/constants/media-selection.constants';
import {
  MediaSelectionStep,
  MediaSelectionResult,
} from '@/features/media-selection/types/media-selection.types';
import { CameraCaptureForm } from '@/features/media-selection/ui/forms/camera-capture-form';
import { CapturedMediaPreviewForm } from '@/features/media-selection/ui/forms/captured-media-preview-form';
import { MediaPickerForm } from '@/features/media-selection/ui/forms/media-picker-form';
import { SourceSelectionForm } from '@/features/media-selection/ui/forms/source-selection-form';
import { useMediaSelector } from '../hooks/use-media-selector';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  getCurrentStep: (currentStep: MediaSelectionStep) => void;
  onConfirm: (media: MediaSelectionResult) => void;
};

export function MediaSelectorWidget({
  isOpen,
  onClose,
  onConfirm,
  getCurrentStep,
}: Props) {
  const {
    step,
    media,
    error,
    handleClear,
    handleClose,
    handleConfirm,
    handleRetake,
    handleSelectMedia,
    handleSelectSource,
    handleSelectStep,
  } = useMediaSelector({
    onConfirm: ({ media }) => onConfirm({ media }),
    getCurrentStep,
  });

  useEffect(() => {
    if (!isOpen) {
      handleClose();
      onClose();
    }
  }, [isOpen]);

  const renderContent = (currentStep: MediaSelectionStep) => {
    switch (currentStep) {
      case MEDIA_SELECTION_STEP.SOURCE:
        return <SourceSelectionForm onSourceSelect={handleSelectSource} />;

      case MEDIA_SELECTION_STEP.PICKER:
        return (
          <MediaPickerForm
            media={media}
            error={error}
            handleSelectMedia={handleSelectMedia}
            onClear={handleClear}
            onConfirm={handleConfirm}
          />
        );

      case MEDIA_SELECTION_STEP.CAMERA:
        return (
          <CameraCaptureForm
            isOpen={isOpen}
            handleSelectMedia={handleSelectMedia}
            onConfirm={() => handleSelectStep(MEDIA_SELECTION_STEP.PREVIEW)}
            media={media}
            error={error}
            onClear={handleClear}
          />
        );

      case MEDIA_SELECTION_STEP.PREVIEW:
        return (
          <CapturedMediaPreviewForm
            media={media}
            onRetake={handleRetake}
            onConfirm={handleConfirm}
          />
        );
    }
  };

  return (
    <StepTransition key={step} stepKey={step} className='w-full h-full'>
      {renderContent(step)}
    </StepTransition>
  );
}
