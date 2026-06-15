import { MediaType } from '@/entities/media';
import { POST_TYPE, POST_VISIBILITY } from '../constants/post.constants';

export interface Post {
  readonly id: string;
  readonly authorId: string;
  readonly caption?: string;
  readonly media: readonly PostMedia[];
  readonly type: PostType;
  readonly likesCount: number;
  readonly commentsCount: number;
  readonly sharesCount: number;
  readonly savesCount: number;
  readonly isLiked: boolean;
  readonly isSaved: boolean;
  readonly createdAt: string;
  readonly updatedAt?: string;
  readonly tags?: readonly string[];
  readonly location?: string;
  readonly visibility: PostVisibility;
}

export interface PostMedia {
  readonly id: string;
  readonly url: string;
  readonly type: MediaType;
  readonly thumbnailUrl?: string;
  readonly duration?: number; // for videos
  readonly width: number;
  readonly height: number;
  readonly altText?: string;
}

export type PostVisibility =
  (typeof POST_VISIBILITY)[keyof typeof POST_VISIBILITY];
export type PostType = (typeof POST_TYPE)[keyof typeof POST_TYPE];
