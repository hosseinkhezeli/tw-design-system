'use client'
/* eslint-disable react-hooks/refs */
import { useState } from 'react';
import { MasonryListProps } from './types';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';
import { useVirtualizeMasonryList } from './use-virtualize-masonry-list';
import { Spinner } from '../spinner';

export function MasonryList<T>({
  totalCount,
  items,
  renderItem,
  getItemId,
  hasMore = true,
  isLoadingMore = false,
  onLoadMore,
}: MasonryListProps<T>) {
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(
    null,
  );

  const { sentinelRef } = useInfiniteScroll({
    root: scrollElement,
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: onLoadMore ?? (() => {}),
    threshold: 1,
    rootMargin: '400px',
  });

  const { totalHeight, virtualItems, measureEl } = useVirtualizeMasonryList({
    totalCount,
    getScrollElement: () => scrollElement,
    getItemId,
  });

  return (
    <div
      ref={setScrollElement}
      className='h-[calc(100dvh-68px)] overflow-y-auto w-full max-w-xl no-scrollbar'
    >
      <div
        className='relative'
        style={{
          height: totalHeight,
        }}
      >
        {virtualItems.map((virtualItem) => {
          const item = items[virtualItem.index]!;
          return (
            <div
              key={virtualItem.key}
              ref={measureEl}
              data-index={virtualItem.index}
              style={{
                position: 'absolute',
                width: 'calc((100% - 8px) / 2)',
                left: `${(virtualItem.lane * 100) / 2}%`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderItem({
                item,
                index: virtualItem.index,
              })}
            </div>
          );
        })}

        {hasMore && (
          <div
            ref={sentinelRef}
            className='w-dvw max-w-xl h-6 left-0 bottom-0 absolute'
          />
        )}
      </div>

      {isLoadingMore && (
        <div className='flex items-center justify-center py-8 w-dvw max-w-xl h-6'>
          <Spinner />
        </div>
      )}
    </div>
  );
}
