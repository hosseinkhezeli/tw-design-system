import { MEDIA_SELECTION_STEP } from '@/features/media-selection/constants/media-selection.constants';
import { CreatePostStep } from '../types/create-post.types';
import { UPLOAD_PROCESS } from '@/entities/media/constants/media.constants';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';

export const MAX_CAPTION_CHARACTERS = 2_200;
export const MAX_TITLE_CHARACTERS = 1_100;
export const MAX_HASHTAGS = 30;

export const CREATE_POST_STEPS = {
  ...MEDIA_SELECTION_STEP,
  DETAILS: 'DETAILS',
} as const;

export const POST_BACK_MAP: Record<CreatePostStep, CreatePostStep | null> = {
  [CREATE_POST_STEPS.READY]: null,
  [CREATE_POST_STEPS.DETAILS]: CREATE_POST_STEPS.PREVIEW,
  [CREATE_POST_STEPS.PREVIEW]: CREATE_POST_STEPS.SOURCE,
  [CREATE_POST_STEPS.CAMERA]: CREATE_POST_STEPS.SOURCE,
  [CREATE_POST_STEPS.PICKER]: CREATE_POST_STEPS.SOURCE,
  [CREATE_POST_STEPS.SOURCE]: null,
};

export const THUMBNAIL_STATUS = {
  [UPLOAD_PROCESS.NOT_STARTED]: {
    text: 'آماده بارگذاری',
  },
  [UPLOAD_PROCESS.IN_PROGRESS]: {
    text: 'در حال آپلود...',
  },
  [UPLOAD_PROCESS.SUCCEED]: {
    text: 'آپلود موفق',
    icon: IconCheck,
    className: 'text-primary',
  },
  [UPLOAD_PROCESS.ERROR]: {
    text: 'خطا در آپلود',
    icon: IconAlertCircle,
    className: 'text-destructive',
  },
} as const;
