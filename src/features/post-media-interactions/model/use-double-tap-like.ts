/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type UseDoubleTapLikeOptions = {
  postId: string;
  initialIsLiked: boolean;
  initialLikesCount: number;
  mockLatencyMs?: number;
};

type LikeAction = 'like' | 'unlike';

export function useDoubleTapLike({
  postId,
  initialIsLiked,
  initialLikesCount,
  mockLatencyMs = 180,
}: UseDoubleTapLikeOptions) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isPending, setIsPending] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const isLikedRef = useRef(initialIsLiked);
  const likesCountRef = useRef(initialLikesCount);
  const lastTapAtRef = useRef(0);
  const burstTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikesCount(initialLikesCount);

    isLikedRef.current = initialIsLiked;
    likesCountRef.current = initialLikesCount;
  }, [postId, initialIsLiked, initialLikesCount]);

  useEffect(() => {
    return () => {
      if (burstTimerRef.current) {
        window.clearTimeout(burstTimerRef.current);
      }
    };
  }, []);

  const triggerBurst = useCallback(() => {
    if (burstTimerRef.current) {
      window.clearTimeout(burstTimerRef.current);
    }

    setShowBurst(true);

    burstTimerRef.current = window.setTimeout(() => {
      setShowBurst(false);
    }, 400);
  }, []);

  const commitLikeChange = useCallback(
    async (action: LikeAction) => {
      const nextLiked = action === 'like';

      if (isLikedRef.current === nextLiked) return;

      const prevLiked = isLikedRef.current;
      const prevCount = likesCountRef.current;

      isLikedRef.current = nextLiked;
      likesCountRef.current = Math.max(0, prevCount + (nextLiked ? 1 : -1));

      setIsLiked(nextLiked);
      setLikesCount(likesCountRef.current);
      setIsPending(true);

      try {
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, mockLatencyMs);
        });
      } catch {
        isLikedRef.current = prevLiked;
        likesCountRef.current = prevCount;

        setIsLiked(prevLiked);
        setLikesCount(prevCount);
      } finally {
        setIsPending(false);
      }
    },
    [mockLatencyMs],
  );

  const like = useCallback(async () => {
    await commitLikeChange('like');
  }, [commitLikeChange]);

  const unlike = useCallback(async () => {
    await commitLikeChange('unlike');
  }, [commitLikeChange]);

  const toggleLike = useCallback(async () => {
    await commitLikeChange(isLikedRef.current ? 'unlike' : 'like');
  }, [commitLikeChange]);

  const registerTap = useCallback(() => {
    const now = Date.now();
    const delta = now - lastTapAtRef.current;

    lastTapAtRef.current = now;

    const isDoubleTap = delta > 0 && delta < 280;

    if (!isDoubleTap) return false;

    if (!isLikedRef.current) {
      void like();
      triggerBurst();
    }

    lastTapAtRef.current = 0;
    return true;
  }, [like, triggerBurst]);

  return {
    isLiked,
    likesCount,
    isPending,
    showBurst,
    like,
    unlike,
    toggleLike,
    registerTap,
  };
}
