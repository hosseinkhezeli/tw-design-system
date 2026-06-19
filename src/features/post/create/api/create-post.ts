import { CreatePostDto } from '../schemas/create-post.schema';
import { CreatePostApi } from './create-post-api';

export const createPost = async (
  dto: CreatePostDto & { mediaIds: string[] },
) => {
  return CreatePostApi.create(dto);
};
