/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@/entities/user';

export class ProfileWidgetModel {
  constructor(public readonly user: User) {}

  static from(data: Partial<User>): ProfileWidgetModel {
    return new ProfileWidgetModel({
      id: data.id ?? '',
      username: data.username ?? '',
      fullName: data.fullName ?? '',
      avatarUrl: data.avatarUrl,
      bio: data.bio,
      followersCount: data.followersCount ?? 0,
      followingCount: data.followingCount ?? 0,
      postsCount: data.postsCount ?? 0,
      isVerified: data.isVerified ?? false,
      interests: data.interests ?? [],
      createdAt: data.createdAt ?? '',
      updatedAt: data.updatedAt,
    });
  }
}
