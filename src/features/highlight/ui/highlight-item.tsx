import { StoryAvatar } from '@/shared/ui/story/story-avatar';

type Props = {
  title: string;
  cover: string;
  onClick: () => void;
};

export function HighlightItem({ title, cover, onClick }: Props) {
  return (
    <li className='flex flex-col items-center gap-1' onClick={onClick}>
      <StoryAvatar src={cover} fallback={title[0]} hasStory />
      <span className='text-xs'>{title}</span>
    </li>
  );
}
