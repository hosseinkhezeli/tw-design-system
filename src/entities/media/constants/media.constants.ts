export const MEDIA_TYPE = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
} as const;

export const UPLOAD_PROCESS = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  ERROR: 'ERROR',
  SUCCEED: 'SUCCEED',
} as const;

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const MEDIA_ASPECT_RATIO = {
  SQUARE: 1 / 1,
  VIDEO: 16 / 9,
  VIDEO_ROTATED: 9 / 16,
  FRAME: 4 / 3,
  FRAME_ROTATED: 3 / 4,
  AUTO: 'auto',
};
