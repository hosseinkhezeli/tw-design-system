import type { MediaItem } from '@/entities/media/types/media.types';

import {
  MEDIA_SELECTION_STEP,
  MEDIA_SOURCE,
} from '../constants/media-selection.constants';

export type MediaSelectionStep =
  (typeof MEDIA_SELECTION_STEP)[keyof typeof MEDIA_SELECTION_STEP];

export type MediaSelectionResult = {
  media: MediaItem[];
};

export type MediaSelectionSource =
  (typeof MEDIA_SOURCE)[keyof typeof MEDIA_SOURCE];
