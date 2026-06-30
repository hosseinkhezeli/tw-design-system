import { PostCardMasonrySkeleton } from '@/entities/post/ui/post-card-masonry/post-card-masonry.skeleton';

export function MasonryFeedSkeleton() {
  return (
    <div className='flex w-full mx-auto max-w-xl gap-2 h-[calc(100dvh-68px)] overflow-y-auto no-scrollbar'>
      <div className='flex flex-col w-full '>
        {Array.from({ length: 4 }).map((_, i) => (
          <PostCardMasonrySkeleton key={i} index={i} />
        ))}
      </div>
      <div className='flex flex-col w-full'>
        {Array.from({ length: 4 }).map((_, i) => (
          <PostCardMasonrySkeleton key={i} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
