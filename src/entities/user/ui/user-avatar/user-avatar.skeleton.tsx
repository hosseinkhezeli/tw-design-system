'use client';

import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";

export function UserAvatarSkeleton() {
  return (
    <Avatar className='min-h-20 min-w-20 aspect-square border-2 border-muted-foreground animate-pulse'>
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}
