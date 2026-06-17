'use client';

import { useMemo, useState } from 'react';

import { MediaService } from '@/entities/media/lib/media.service';
import type { MediaItem } from '@/entities/media/types/media.types';
import type {
  MediaSelectionResult,
  MediaSelectionSource,
  MediaSelectionStep,
} from '../types/media-selection.types';
import {
  MEDIA_SELECTION_STEP,
  MEDIA_SOURCE,
} from '../constants/media-selection.constants';

type UseMediaSelectionParams = {
  onConfirm: (result: MediaSelectionResult) => void;
  getCurrentStep: (currentStep: MediaSelectionStep) => void;
};

export function useMediaSelection({
  onConfirm,
  getCurrentStep,
}: UseMediaSelectionParams) {
  const mediaService = useMemo(() => new MediaService(), []);
  const [source, setSource] = useState<MediaSelectionSource | null>(null);
  const [step, setStep] = useState<MediaSelectionStep>(
    MEDIA_SELECTION_STEP.SOURCE,
  );
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSelectStep = (step: MediaSelectionStep) => {
    getCurrentStep(step);
    setStep(step);
  };

  const handleSelectMedia = (file: File[]) => {
    const latestFile = file.at(-1);
    if (!latestFile) return;

    const validationError = mediaService.validateImage(latestFile);

    if (validationError) {
      setError(validationError);
      return;
    }

    const item = mediaService.createMediaItem(latestFile);

    setMedia([item]);
    setError(null);
  };

  const handleSelectSource = async (selectedSource: MediaSelectionSource) => {
    setSource(selectedSource);

    if (selectedSource === MEDIA_SOURCE.GALLERY) {
      handleSelectStep(MEDIA_SELECTION_STEP.PICKER);
      return;
    }

    if (selectedSource === MEDIA_SOURCE.CAMERA) {
      handleSelectStep(MEDIA_SELECTION_STEP.CAMERA);
    }
  };

  const handleConfirm = () => {
    onConfirm({ media });
    handleSelectStep(MEDIA_SELECTION_STEP.READY);
  };

  const handleRetake = () => {
    media.forEach((item) => mediaService.revokePreviewUrl(item.previewUrl));
    setMedia([]);
    handleSelectStep(MEDIA_SELECTION_STEP.CAMERA);
    setError(null);
  };

  const handleClear = () => {
    media.forEach((item) => mediaService.revokePreviewUrl(item.previewUrl));
    setMedia([]);
    handleSelectStep(MEDIA_SELECTION_STEP.PICKER);
    setError(null);
  };

  const handleClose = () => {
    setMedia([]);
    setError(null);
  };

  return {
    step,
    media,
    error,
    source,
    handleSelectSource,
    handleSelectMedia,
    handleConfirm,
    handleRetake,
    handleClear,
    handleClose,
    handleSelectStep,
  };
}
