import { MEDIA_SELECTION_STEP } from '@/features/media-selection/constants/media-selection.constants';
import { CreatePostStep } from '../types/create-post.types';

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
