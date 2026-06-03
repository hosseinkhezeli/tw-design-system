import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

export function UserAvatar() {
  return (
    <Avatar className='min-h-20 min-w-20 aspect-square'>
      <AvatarImage
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJEFNYx3d2sd1N8QPrARg0F7PvaJYkT_V9g&s'
        alt='@shadcn'
      />
      <AvatarFallback>IR</AvatarFallback>
    </Avatar>
  );
}
