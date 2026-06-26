/* eslint-disable @typescript-eslint/no-explicit-any */

import { Post } from '../types/post.types';

export class PostModel {
  constructor(public readonly post: Post) {}

  static from(data: any): PostModel {
    return new PostModel({
      id: data?.id,

      type: data?.type,

      author: {
        displayName: data?.author?.displayName,
        id: data?.author?.id,
        isVerified: data?.author?.isVerified,
        username: data?.author?.username,
        avatarUrl: data?.author?.avatarUrl,
      },

      title: data?.title,
      caption: data?.caption,

      hashtags: data?.hastags,

      media: [...data?.media],

      products: [...data?.products],

      location: data?.location,

      visibility: data?.visibility,

      likesCount: data?.likesCount,
      commentsCount: data?.commentsCount,
      sharesCount: data?.sharesCount,
      savesCount: data?.savesCount,

      viewer: {
        canDelete: data?.viewer?.canDelete,
        canEdit: data?.viewer?.canEdit,
        isLiked: data?.viewer?.isLiked,
        isSaved: data?.viewer?.isSaved,
      },

      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    });
  }
}
