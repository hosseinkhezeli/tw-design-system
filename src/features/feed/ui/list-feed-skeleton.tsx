import { PostCardFullSkeleton } from '@/entities/post/ui/post-card-full/post-card-full.skeleton';

export function ListFeedSkeleton() {
  return (
    <div className='flex w-full mx-auto max-w-xl gap-2 h-[calc(100dvh-68px)] overflow-y-auto no-scrollbar'>
      <div className='flex flex-col w-full'>
        {Array.from({ length: 4 }).map((_, i) => (
          <PostCardFullSkeleton key={i} index={0} />
        ))}
      </div>
    </div>
  );
}
