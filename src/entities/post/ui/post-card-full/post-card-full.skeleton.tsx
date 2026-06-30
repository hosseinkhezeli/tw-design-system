import { Skeleton } from '@/shared/ui/skeleton';

type Props = {
  index: number;
};
export function PostCardFullSkeleton({ index }: Props) {
  const isEven = index % 2 === 0;
  const height = !isEven ? 280 : 360;
  const baseDelay = index * 80;
  return (
    <div
      className='flex flex-col w-full mb-2 animate-appear opacity-0'
      style={{ minHeight: height, animationDelay: `${baseDelay}ms` }}
    >
      <Skeleton
        className='w-full rounded-b-none rounded-t-sm '
        style={{
          minHeight: Math.round(height * 0.75),
        }}
      />
      <div
        className='p-3 flex flex-col gap-2 animate-appear opacity-0'
        style={{ animationDelay: `${baseDelay + 60}ms` }}
      >
        <Skeleton className='w-3/4 h-6 ' />
        {isEven && <Skeleton className='w-2/5 h-4 ' />}
        <div className='flex items-center justify-between  gap-6'>
          <div
            className='flex items-center gap-3 animate-appear opacity-0'
            style={{ animationDelay: `${baseDelay + 120}ms` }}
          >
            <Skeleton className='h-6 w-6 rounded-full ' />
            <Skeleton className='h-3 w-16 ' />
          </div>
          <div
            className='flex items-center gap-3 flex-2 animate-appear opacity-0'
            style={{ animationDelay: `${baseDelay + 180}ms` }}
          >
            <Skeleton className='h-3 flex-1 ' />
            <Skeleton className='h-6 w-6 rounded-full ' />
          </div>
        </div>
      </div>
    </div>
  );
}
