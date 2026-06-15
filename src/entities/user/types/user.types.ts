export interface User {
  readonly id: string;
  readonly username: string;
  readonly fullName: string;
  readonly avatarUrl?: string;
  readonly bio?: string;
  readonly followersCount: number;
  readonly followingCount: number;
  readonly postsCount: number;
  readonly isVerified: boolean;
  readonly interests: readonly string[];
  readonly createdAt: string;
  readonly updatedAt?: string;
}

export interface UserProfile extends User {
  readonly email?: string;
  readonly phone?: string;
  readonly dateOfBirth?: string;
  readonly countryCode?: string;
}

export interface UserRelation {
  readonly userId: string;
  readonly targetUserId: string;
  readonly followedAt: string;
}
