export function PostSkeleton() {
  return (
    <div className='mb-6 overflow-hidden  bg-background'>
      <div className='flex items-center gap-3 p-4'>
        <div className='size-10 animate-pulse rounded-full bg-muted' />

        <div className='h-4 w-32 animate-pulse rounded bg-muted' />
      </div>

      <div className='aspect-square animate-pulse bg-muted' />

      <div className='space-y-3 p-4'>
        <div className='h-4 w-24 animate-pulse rounded bg-muted' />

        <div className='h-4 w-full animate-pulse rounded bg-muted' />

        <div className='h-4 w-2/3 animate-pulse rounded bg-muted' />
      </div>
    </div>
  );
}
