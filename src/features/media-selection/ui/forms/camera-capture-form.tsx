'use client';

import { useMemo } from 'react';
import { IconCamera, IconX } from '@tabler/icons-react';

import { Button } from '@/shared/ui/button';
import { MediaPreviewThumbnail } from '../components/media-preview-thumbnail';
import { useCameraCapture } from '@/shared/services/device/camera/hooks/use-camera-capture';
import { MediaSelectionResult } from '../../types/media-selection.types';

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  media: MediaSelectionResult['media'];
  error?: string | null;
  onClear: () => void;
  handleSelectMedia: (files: File[]) => void;
};

export const CameraCaptureForm = ({
  isOpen,
  onConfirm,
  media,
  onClear,
  error: mediaError,
  handleSelectMedia,
}: Props) => {
  const latestMedia = media.at(-1);

  const {
    videoRef,
    status,
    error: cameraError,
    isBusy,
    capture,
    stopCamera,
    restartCamera,
  } = useCameraCapture({
    isOpen,
    facingMode: 'environment',
  });

  const error = useMemo(
    () => cameraError ?? mediaError,
    [cameraError, mediaError],
  );

  const handleCapture = async () => {
    const file = await capture();
    if (!file) return;

    handleSelectMedia([file]);
    onConfirm();
    stopCamera();
  };

  const handleClearLatest = () => {
    if (!latestMedia) return;

    onClear();
    restartCamera();
  };

  return (
    <div className='flex w-full flex-col gap-6'>
      {!latestMedia ? (
        <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-black'>
          <video
            ref={videoRef}
            className='aspect-[3/4] w-full object-cover'
            autoPlay
            playsInline
            muted
          />

          {status !== 'ready' && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
              <div className='flex flex-col items-center gap-3 text-white/80'>
                <div className='h-6 w-6 animate-spin rounded-full border-2 border-white/25 border-t-white' />
                <p className='text-sm'>
                  {status === 'error'
                    ? 'Camera unavailable'
                    : 'Opening camera...'}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <MediaPreviewThumbnail
          handleClearMedia={handleClearLatest}
          thumbnailSrc={latestMedia.previewUrl}
        />
      )}

      {error && <p className='text-sm text-destructive'>{error}</p>}

      <div className='grid place-content-center'>
        {!latestMedia ? (
          <Button
            type='button'
            onClick={handleCapture}
            isLoading={isBusy || status !== 'ready'}
            variant={'outline'}
            size={'icon-lg'}
            className='w-20 h-20 rounded-full'
          >
            {!(isBusy || status !== 'ready') && (
              <IconCamera className='size-8 stroke-1 ' />
            )}
          </Button>
        ) : (
          <Button
            type='button'
            variant='secondary'
            onClick={handleClearLatest}
            disabled={isBusy}
          >
            <IconX className='size-8' />
            عکس جدید
          </Button>
        )}
      </div>
    </div>
  );
};
