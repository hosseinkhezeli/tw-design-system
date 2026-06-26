import { MediaType } from '@/entities/media';
import { POST_TYPE, POST_VISIBILITY } from '../constants/post.constants';

export interface Post {
  readonly id: string;

  readonly type: PostType;

  readonly author: PostAuthor;

  readonly title?: string;
  readonly caption?: string;

  readonly hashtags: readonly string[];

  readonly media: readonly PostMedia[];

  readonly products: readonly PostProductPreview[];

  readonly location?: string;

  readonly visibility: PostVisibility;

  readonly likesCount: number;
  readonly commentsCount: number;
  readonly sharesCount: number;
  readonly savesCount: number;

  readonly viewer: PostViewer;

  readonly createdAt: string;
  readonly updatedAt?: string;
}

export interface PostAuthor {
  readonly id: string;
  readonly username: string;
  readonly displayName: string;
  readonly avatarUrl?: string;
  readonly isVerified: boolean;
}

export interface PostViewer {
  readonly isLiked: boolean;
  readonly isSaved: boolean;

  readonly canEdit: boolean;
  readonly canDelete: boolean;
}

export interface PostMedia {
  readonly id: string;

  readonly type: MediaType;

  readonly url: string;
  readonly thumbnailUrl?: string;

  readonly width: number;
  readonly height: number;

  readonly duration?: number;

  readonly altText?: string;
}

export interface PostProductPreview {
  readonly id: string;

  readonly title: string;

  readonly imageUrl: string;

  readonly price: number;
}

export type PostVisibility =
  (typeof POST_VISIBILITY)[keyof typeof POST_VISIBILITY];

export type PostType = (typeof POST_TYPE)[keyof typeof POST_TYPE];
