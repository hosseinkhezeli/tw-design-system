import { httpClient } from '@/shared/lib/http/http-client';
import { User, UserProfile } from '../types/user.types';
import { routes } from '../configs/api.routes';
import { UpdateProfileDto } from '../schemas/user.schema';

export const UserApi = {
  getById: (id: User['id']) => httpClient.get<User>(routes.getUser(id)),
  update: (data: UpdateProfileDto) =>
    httpClient.patch<UserProfile>(routes.update, data),
  follow: (targetUserId: User['id']) =>
    httpClient.post<null>(routes.follow(targetUserId)),
  unfollow: (targetUserId: User['id']) =>
    httpClient.delete<null>(routes.unfollow(targetUserId)),
} as const;
