/* eslint-disable @typescript-eslint/no-explicit-any */
import { POST_TYPE } from '../constants/post.constants';
import type { Post } from '../types/post.types';

export class PostModel {
  static normalize(raw: any): Post {
    return {
      ...raw,
      media: Object.freeze(raw.media ?? []),
      tags: Object.freeze(raw.tags ?? []),
      type:
        raw.type ||
        (raw.media?.length > 1 ? POST_TYPE.CAROUSEL : POST_TYPE.IMAGE),
    };
  }
}
