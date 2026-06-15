export type CaptureVideoFrameOptions = {
  fileName?: string;
  mimeType?: 'image/jpeg' | 'image/png';
  quality?: number;
  timeoutMs?: number;
};

export function waitForVideoReady(
  video: HTMLVideoElement,
  timeoutMs = 5000,
): Promise<void> {
  if (
    video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
    video.videoWidth > 0
  ) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    let settled = false;

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('error', onError);
    };

    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (error) reject(error);
      else resolve();
    };

    const onReady = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        finish();
      }
    };

    const onError = () => {
      finish(new Error('Failed to prepare camera preview.'));
    };

    const timeoutId = window.setTimeout(() => {
      finish(new Error('Timed out while preparing camera preview.'));
    }, timeoutMs);

    video.addEventListener('loadedmetadata', onReady);
    video.addEventListener('canplay', onReady);
    video.addEventListener('error', onError, { once: true });

    onReady();
  });
}

export async function captureVideoFrame(
  video: HTMLVideoElement,
  options: CaptureVideoFrameOptions = {},
): Promise<File> {
  await waitForVideoReady(video, options.timeoutMs ?? 5000);

  const width = Math.max(1, video.videoWidth);
  const height = Math.max(1, video.videoHeight);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas context is not available.');
  }

  context.drawImage(video, 0, 0, width, height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error('Failed to create image blob.'));
          return;
        }

        resolve(result);
      },
      options.mimeType ?? 'image/jpeg',
      options.quality ?? 0.92,
    );
  });

  const fileName = options.fileName ?? `camera-${Date.now()}.jpg`;
  const mimeType = blob.type || options.mimeType || 'image/jpeg';

  return new File([blob], fileName, { type: mimeType });
}
