import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarProps,
  AvatarRing,
} from '../ui/avatar';

export function StoryAvatar({
  src,
  fallback,
  hasStory,
  seen,
  onClick,
}: AvatarProps) {
  return (
    <button onClick={onClick} className='flex flex-col items-center gap-1'>
      <AvatarRing active={Boolean(hasStory && !seen)}>
        <Avatar className='min-h-15 min-w-15 aspect-square'>
          <AvatarImage src={src} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </AvatarRing>
    </button>
  );
}
