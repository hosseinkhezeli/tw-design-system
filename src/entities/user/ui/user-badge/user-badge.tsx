import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { APP_ROUTES } from '@/shared/config/app-routes';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { Post } from '@/entities/post';

interface UserBadgeProps {
  user: Post['author'];
  className?: string;
}

export const UserBadge = ({ user, className = '' }: UserBadgeProps) => {
  return (
    <Link
      href={APP_ROUTES.profile.user(user.id)}
      prefetch={false}
      className={`flex items-center gap-1 min-w-0 not-italic hover:opacity-80 transition-opacity ${className}`}
    >
      <span className='min-w-0 truncate text-xs font-medium text-muted-foreground'>
        {user.displayName}
      </span>

      <Avatar size='sm'>
        <AvatarImage
          src={user.avatarUrl}
          alt={`${user.displayName}'s avatar`}
        />
        <AvatarFallback>
          <IconUser />
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};
