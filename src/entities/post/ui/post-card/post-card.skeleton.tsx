export const PostCardSkeleton = () => (
  <div className='border border-border rounded-3xl overflow-hidden'>
    <div className='w-full aspect-square bg-accent animate-pulse' />
    <div className='p-4 space-y-3'>
      <div className='h-4 w-3/4 bg-accent animate-pulse' />
      <div className='h-4 w-1/2 bg-accent animate-pulse' />
    </div>
  </div>
);
