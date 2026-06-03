'use client';
import { VisuallyHidden } from 'radix-ui';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export function UserAvatar() {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Avatar className='min-h-20 min-w-20 aspect-square'>
          <AvatarImage
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJEFNYx3d2sd1N8QPrARg0F7PvaJYkT_V9g&s'
            alt='@shadcn'
          />
          <AvatarFallback>IR</AvatarFallback>
        </Avatar>
      </DialogTrigger>

      <DialogContent
        className='w-max h-max items-center justify-center bg-transparent border-none ring-0'
        showCloseButton={false}
      >
        <img
          className='w-full max-w-40 h-auto aspect-square rounded-full animate-in'
          src={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJEFNYx3d2sd1N8QPrARg0F7PvaJYkT_V9g&s'
          }
        />

        <VisuallyHidden.VisuallyHidden>
          <DialogTitle>User profile picture</DialogTitle>
          <DialogDescription>Enlarged profile picture.</DialogDescription>
        </VisuallyHidden.VisuallyHidden>
      </DialogContent>
    </Dialog>
  );
}
