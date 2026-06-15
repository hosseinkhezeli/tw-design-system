/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from '../types/user.types';

export class UserModel {
  static normalize(raw: any): User {
    return {
      ...raw,
      interests: Object.freeze(raw.interests ?? []),
      fullName:
        raw.fullName?.trim() ||
        `${raw.firstName || ''} ${raw.lastName || ''}`.trim(),
    };
  }

  static isActive(user: User): boolean {
    return user.postsCount > 0 || user.followersCount > 5;
  }
}
