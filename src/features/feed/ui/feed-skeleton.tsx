import { PostCardFullSkeleton } from '@/entities/post/ui/post-card-full/post-card-full.skeleton';

export function FeedSkeleton() {
  return (
    <div className='mx-auto max-w-xl'>
      {Array.from({ length: 8 }).map((_, i) => (
        <PostCardFullSkeleton key={i} index={i} />
      ))}
    </div>
  );
}
