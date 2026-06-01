import { PostSkeleton } from './post-skeleton';

export function FeedSkeleton() {
  return (
    <div className='mx-auto max-w-xl'>
      {Array.from({ length: 8 }).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}
