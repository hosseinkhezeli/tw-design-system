'use client';

import { useState } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { cn, formatCompact } from '@/shared/utils';

interface LikePostButtonProps {
  postId: string;
  initialIsLiked: boolean;
  initialLikesCount: number; // New Prop
  className?: string;
}

export function LikePostButton({
  postId,
  initialIsLiked,
  initialLikesCount,
  className,
}: LikePostButtonProps) {
  // Track both the liked state AND the numeric count
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleLike = async () => {
    if (isLoading) return;

    // Save previous state in case we need to revert
    const previousIsLiked = isLiked;
    const previousLikesCount = likesCount;

    // 1. Optimistic UI update: Flip the state and adjust the count instantly
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
    setIsLoading(true);

    try {
      // 2. Make your API call here
      // await togglePostLike(postId, newIsLiked);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      // 3. Revert to the previous state if the server request fails
      setIsLiked(previousIsLiked);
      setLikesCount(previousLikesCount);
      console.error('Failed to toggle like', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type='button'
      onClick={handleToggleLike}
      disabled={isLoading}
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
      className={cn(
        'flex items-center gap-1.5 transition-colors hover:opacity-80 focus-visible:outline-none disabled:cursor-not-allowed',
        isLiked ? 'text-destructive' : 'text-muted-foreground',
        className,
      )}
    >
      {isLiked ? (
        <IconHeartFilled aria-hidden='true' className='w-5 h-5' />
      ) : (
        <IconHeart aria-hidden='true' className='w-5 h-5' />
      )}

      <span className='text-xs w-max'>{formatCompact(likesCount)}</span>
    </button>
  );
}
