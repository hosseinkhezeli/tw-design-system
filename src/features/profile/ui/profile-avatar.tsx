import { UserAvatarSkeleton } from '@/shared/components/user-avatar/user-avatar.skeleton';
import dynamic from 'next/dynamic';

const UserAvatar = dynamic(
  () =>
    import('@/shared/components/user-avatar/user-avatar').then(
      (comp) => comp.UserAvatar,
    ),
  { loading: UserAvatarSkeleton },
);

export function ProfileAvatar() {
  return <UserAvatar />;
}
