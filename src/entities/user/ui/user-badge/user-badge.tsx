import Link from 'next/link';
import { IconUser } from '@tabler/icons-react';
import { cva, type VariantProps } from 'class-variance-authority';

import type { Post } from '@/entities/post';
import { APP_ROUTES } from '@/shared/config/app-routes';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarSize,
} from '@/shared/ui/avatar';
import { cn } from '@/shared/utils';

const userBadgeVariants = cva(
  'flex items-center min-w-0 not-italic hover:opacity-80 transition-opacity',
  {
    variants: {
      size: {
        default: 'gap-1',
        sm: 'gap-1',
        lg: 'gap-2',
        xl: 'gap-2.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const userBadgeTextVariants = cva(
  'min-w-0 truncate font-medium text-muted-foreground',
  {
    variants: {
      size: {
        default: 'text-xs',
        sm: 'text-xs',
        lg: 'text-sm',
        xl: 'text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const avatarSizeMap: Record<NonNullable<UserBadgeProps['size']>, AvatarSize> = {
  default: 'sm',
  sm: 'sm',
  lg: 'lg',
  xl: 'xl',
};

interface UserBadgeProps extends VariantProps<typeof userBadgeVariants> {
  user: Post['author'];
  className?: string;
}

export const UserBadge = ({
  user,
  className,
  size = 'default',
}: UserBadgeProps) => {
  return (
    <Link
      href={APP_ROUTES.profile.user(user?.id)}
      prefetch={false}
      className={cn(userBadgeVariants({ size }), className)}
    >
      <Avatar size={avatarSizeMap[size!]}>
        <AvatarImage
          src={user?.avatarUrl}
          alt={`${user?.displayName}'s avatar`}
        />
        <AvatarFallback>
          <IconUser />
        </AvatarFallback>
      </Avatar>

      <span className={userBadgeTextVariants({ size })}>
        {user?.displayName}
      </span>
    </Link>
  );
};
