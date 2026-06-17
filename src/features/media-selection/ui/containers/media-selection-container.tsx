'use client';

import { useMediaSelection } from '../../hooks/use-media-selection';
import { MEDIA_SELECTION_STEP } from '../../constants/media-selection.constants';
import { SourceSelectionForm } from '../forms/source-selection-form';
import { MediaPickerForm } from '../forms/media-picker-form';
import { CapturedMediaPreviewForm } from '../forms/captured-media-preview-form';
import { CameraCaptureForm } from '../forms/camera-capture-form';
import {
  MediaSelectionResult,
  MediaSelectionStep,
} from '../../types/media-selection.types';
import { useEffect } from 'react';
import { StepTransition } from '@/shared/components/ui/transitions/step-transition';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  getCurrentStep: (currentStep: MediaSelectionStep) => void;
  onConfirm: (media: MediaSelectionResult) => void;
};

export function MediaSelectionContainer({
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
  } = useMediaSelection({
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
