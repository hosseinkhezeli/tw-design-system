import { PostCardSkeleton } from "@/entities/post";

export function FeedSkeleton() {
  return (
    <div className='mx-auto max-w-xl'>
      {Array.from({ length: 8 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}
