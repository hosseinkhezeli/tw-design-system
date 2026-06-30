/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { RefCallback, useCallback, useEffect, useRef, useState } from 'react';

export type UseInfiniteScrollOptions<T extends Element = HTMLDivElement> = {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void | Promise<void>;

  enabled?: boolean;

  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

export type UseInfiniteScrollReturn<T extends Element = HTMLDivElement> = {
  sentinelRef: RefCallback<T>;
  isIntersecting: boolean;
  isSupported: boolean;
};

export function useInfiniteScroll<T extends Element = HTMLDivElement>({
  hasMore,
  isLoading,
  onLoadMore,

  enabled = true,

  root = null,
  rootMargin = '200px',
  threshold = 0,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [targetNode, setTargetNode] = useState<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  const latestRef = useRef({
    hasMore,
    isLoading,
    enabled,
    onLoadMore,
  });

  const triggerLockRef = useRef(false);

  useEffect(() => {
    latestRef.current = {
      hasMore,
      isLoading,
      enabled,
      onLoadMore,
    };
  }, [hasMore, isLoading, enabled, onLoadMore]);

  useEffect(() => {
    setIsSupported(
      typeof window !== 'undefined' && 'IntersectionObserver' in window,
    );
  }, []);

  useEffect(() => {
    if (!isLoading) {
      triggerLockRef.current = false;
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isSupported || !targetNode) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        const visible = entry.isIntersecting || entry.intersectionRatio > 0;

        setIsIntersecting(visible);

        if (!visible) {
          return;
        }

        const { enabled, hasMore, isLoading, onLoadMore } = latestRef.current;

        if (!enabled || !hasMore || isLoading || triggerLockRef.current) {
          return;
        }

        triggerLockRef.current = true;

        void Promise.resolve(onLoadMore()).catch(() => {
          triggerLockRef.current = false;
        });
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(targetNode);

    return () => {
      observer.disconnect();
    };
  }, [targetNode, isSupported, root, rootMargin, threshold]);

  const sentinelRef = useCallback<RefCallback<T>>((node) => {
    setTargetNode(node);
  }, []);

  console.log({ hasMore, isIntersecting });

  return {
    sentinelRef,
    isIntersecting,
    isSupported,
  };
}
