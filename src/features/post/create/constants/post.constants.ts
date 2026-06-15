import { CreatePostStep } from "../types/create-post.types";

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const POST_SOURCE = {
  CAMERA: 'CAMERA',
  GALLERY: 'GALLERY',
} as const;


export const CREATE_POST_STEPS = {
  SOURCE_SELECTION: 'SOURCE_SELECTION',
  CONTENT: 'CONTENT',
  PREVIEW: 'PREVIEW',
  DETAILS: 'DETAILS',
} as const;

export const POST_BACK_MAP: Record<CreatePostStep, CreatePostStep | null> = {
  [CREATE_POST_STEPS.DETAILS]: CREATE_POST_STEPS.PREVIEW,
  [CREATE_POST_STEPS.PREVIEW]: CREATE_POST_STEPS.SOURCE_SELECTION,
  [CREATE_POST_STEPS.CONTENT]: CREATE_POST_STEPS.SOURCE_SELECTION,
  [CREATE_POST_STEPS.SOURCE_SELECTION]: null,
};
