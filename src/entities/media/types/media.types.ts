import {
  MEDIA_ASPECT_RATIO,
  MEDIA_TYPE,
  UPLOAD_PROCESS,
} from '../constants/media.constants';

export type MediaType = (typeof MEDIA_TYPE)[keyof typeof MEDIA_TYPE];

export interface MediaItem {
  file: File;
  type: 'IMAGE' | 'VIDEO';
  previewUrl: string;
  mediaId?: string;
}

export type UploadingProcess =
  (typeof UPLOAD_PROCESS)[keyof typeof UPLOAD_PROCESS];

export type MediaAspectRatio =
  (typeof MEDIA_ASPECT_RATIO)[keyof typeof MEDIA_ASPECT_RATIO];
