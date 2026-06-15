/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { captureVideoFrame } from '@/shared/lib/browser/capture-video-frame';
import { webCameraService } from '@/shared/services/device/camera/web-camera.service';
import type { CameraFacingMode } from '@/shared/services/device/camera/camera.types';

type UseCameraCaptureParams = {
  isOpen: boolean;
  facingMode?: CameraFacingMode;
};

type CameraStatus = 'idle' | 'loading' | 'ready' | 'error';

function stopMediaStream(stream: MediaStream | null) {
  if (!stream) return;
  stream.getTracks().forEach((track) => track.stop());
}

export const useCameraCapture = ({
  isOpen,
  facingMode = 'environment',
}: UseCameraCaptureParams) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const requestIdRef = useRef(0);

  const [status, setStatus] = useState<CameraStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  const stopCamera = useCallback(() => {
    stopMediaStream(streamRef.current);
    streamRef.current = null;

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.srcObject = null;
    }
  }, []);

  const restartCamera = useCallback(() => {
    requestIdRef.current += 1;
    setError(null);
    setStatus('loading');
  }, []);

  useEffect(() => {
    if (!isOpen) {
      requestIdRef.current += 1;
      stopCamera();
      setStatus('idle');
      setError(null);
      setIsBusy(false);
      return;
    }

    let cancelled = false;
    const requestId = ++requestIdRef.current;

    setStatus('loading');
    setError(null);

    (async () => {
      try {
        const stream = await webCameraService.startCamera({
          facingMode,
          width: 1080,
          height: 1920,
          audio: false,
        });

        if (cancelled || requestId !== requestIdRef.current) {
          stopMediaStream(stream);
          return;
        }

        streamRef.current = stream;

        const video = videoRef.current;
        if (!video) {
          stopMediaStream(stream);
          setStatus('error');
          setError('Camera preview is unavailable.');
          return;
        }

        video.srcObject = stream;
        video.playsInline = true;
        video.autoplay = true;
        video.muted = true;

        try {
          await video.play();
        } catch {
          // Some browsers complain even when the stream is valid.
        }

        if (!cancelled) {
          setStatus('ready');
        }
      } catch (err) {
        if (cancelled || requestId !== requestIdRef.current) return;

        setStatus('error');
        setError(
          err instanceof Error ? err.message : 'Unable to open the camera.',
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [facingMode, isOpen, stopCamera]);

  const capture = useCallback(async () => {
    const video = videoRef.current;

    if (!video || status !== 'ready' || isBusy) {
      return null;
    }

    setIsBusy(true);
    setError(null);

    try {
      return await captureVideoFrame(video, {
        fileName: `camera-${Date.now()}.jpg`,
        mimeType: 'image/jpeg',
        quality: 0.92,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to capture photo.');
      return null;
    } finally {
      setIsBusy(false);
    }
  }, [isBusy, status]);

  const pickFromGallery = useCallback(async () => {
    if (isBusy) return null;

    setIsBusy(true);
    setError(null);

    try {
      return await webCameraService.pickImage();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to pick image.');
      return null;
    } finally {
      setIsBusy(false);
    }
  }, [isBusy]);

  return {
    videoRef,
    status,
    error,
    isBusy,
    capture,
    pickFromGallery,
    stopCamera,
    restartCamera,
  };
};
