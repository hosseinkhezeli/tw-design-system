'use client';
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from '@/shared/components/ui/avatar';
import {
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  Dialog,
} from '@/shared/components/ui/dialog';
import { VisuallyHidden } from 'radix-ui';
import { User } from '../../types/user.types';
import { cn } from '@/shared/utils';

interface UserAvatarProps {
  readonly user?: User;
  readonly size?: 'sm' | 'lg' | 'default' | undefined;
  readonly showVerifiedBadge?: boolean;
  readonly className?: string;
}

export function UserAvatar({
  user,
  className = '',
  showVerifiedBadge = false,
  size = 'default',
}: UserAvatarProps) {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Avatar
          className={cn('min-h-20 min-w-20 aspect-square', className)}
          size={size}
        >
          <AvatarImage src={user?.avatarUrl} alt={user?.fullName} />
          <AvatarFallback>IR</AvatarFallback>
        </Avatar>
      </DialogTrigger>

      <DialogContent
        className='w-max h-max items-center justify-center bg-transparent border-none ring-0'
        showCloseButton={false}
      >
        <img
          className='w-full max-w-40 h-auto aspect-square rounded-full animate-in'
          src={user?.avatarUrl}
          alt={user?.fullName}
        />

        <VisuallyHidden.VisuallyHidden>
          <DialogTitle>User profile picture</DialogTitle>
          <DialogDescription>Enlarged profile picture.</DialogDescription>
        </VisuallyHidden.VisuallyHidden>
      </DialogContent>
    </Dialog>
  );
}
