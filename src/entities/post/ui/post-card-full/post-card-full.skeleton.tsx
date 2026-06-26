import { cn } from '@/shared/utils';

type Props = {
  index: number;
};

export function PostCardFullSkeleton({ index }: Props) {
  const isFrame = index % 2 === 0;

  return (
    <div className='animate-pulse'>
      {/* Media */}
      <div
        className={cn(
          'w-full bg-gray-200',
          isFrame ? 'aspect-[3/4]' : 'aspect-square',
        )}
      />

      {/* Title */}
      <div className='mt-2 space-y-2'>
        <div className='h-4 w-3/4 bg-gray-200 rounded' />
        <div className='h-4 w-1/2 bg-gray-200 rounded' />
      </div>

      {/* Caption */}
      <div className='mt-2 space-y-2'>
        <div className='h-3 w-full bg-gray-200 rounded' />
        <div className='h-3 w-2/3 bg-gray-200 rounded' />
      </div>

      {/* Footer */}
      <div className='mt-3 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          {/* Avatar */}
          <div className='h-8 w-8 rounded-full bg-gray-200' />

          {/* Name */}
          <div className='h-3 w-24 bg-gray-200 rounded' />
        </div>

        {/* Like button */}
        <div className='h-8 w-8 rounded bg-gray-200' />
      </div>
    </div>
  );
}
