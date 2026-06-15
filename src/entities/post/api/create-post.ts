import type { CreatePostDto } from '../schemas/post.schema';
import { PostApi } from './post.api';

export const createPost = async (
  dto: CreatePostDto & { mediaIds: string[] },
) => {
  return PostApi.create(dto);
};
