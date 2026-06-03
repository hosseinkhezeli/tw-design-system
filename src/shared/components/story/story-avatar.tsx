import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

type Props = {
  src?: string;
  fallback: string;
  hasStory?: boolean;
  seen?: boolean;
  onClick?: () => void;
};

export function StoryAvatar({ src, fallback, hasStory, seen, onClick }: Props) {
  return (
    <button onClick={onClick} className='flex flex-col items-center gap-1'>
      <div
        className={[
          'p-[2px] rounded-full',
          hasStory
            ? seen
              ? 'bg-muted'
              : 'bg-gradient-to-tr from-pink-500 to-yellow-400'
            : '',
        ].join(' ')}
      >
        <Avatar>
          <AvatarImage src={src} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </div>
    </button>
  );
}
