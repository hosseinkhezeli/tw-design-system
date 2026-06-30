'use client';
import { RefCallback, useState } from 'react';
import { VirtualListProps } from './types';
import { cn } from '@/shared/utils/cn';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';
import { useVirtualizeList } from './use-virtualize-list';
import { VIRTUAL_LIST_CONFIG } from './list.constant';
import { Spinner } from '../spinner';

export function VirtualList<T>({
  items,
  renderItem,
  estimateSize = () => VIRTUAL_LIST_CONFIG.ESTIMATED_ITEM_SIZE,
  gap = VIRTUAL_LIST_CONFIG.GAP,
  overscan = VIRTUAL_LIST_CONFIG.OVERSCAN,
  className = '',
  scrollContainerClassName = '',
  itemClassName = '',
  totalCount,
  getItemId,
  hasMore,
  isLoadingMore,
  onLoadMore,
}: VirtualListProps<T>) {
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

  const { totalHeight, virtualItems, measureEl } = useVirtualizeList({
    totalCount,
    getScrollElement: () => scrollElement,
    getItemId,
    estimateSize,
    gap,
    overscan,
  });

  return (
    <div
      ref={setScrollElement}
      className={cn(
        scrollContainerClassName,
        'h-[calc(100dvh-68px)] overflow-y-auto w-full max-w-xl no-scrollbar',
      )}
    >
      <ul
        className={className}
        style={{
          height: totalHeight,
          position: 'relative',
          width: '100%',
        }}
      >
        {virtualItems?.map((virtualItem, index) => {
          const item = items[virtualItem.index];

          return (
            <li
              key={virtualItem.key}
              ref={measureEl}
              data-index={virtualItem.index}
              style={{
                position: 'absolute',
                width: '100%',
                left: `${(virtualItem.lane * 100) / 2}%`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
              className={itemClassName}
            >
              {renderItem({ index, item })}
            </li>
          );
        })}
        {hasMore && (
          <li
            ref={sentinelRef as unknown as RefCallback<HTMLLIElement>}
            className='w-dvw max-w-xl h-6 left-0 bottom-0 absolute'
          />
        )}
      </ul>
      {isLoadingMore && (
        <div className='flex items-center justify-center py-8 w-dvw max-w-xl h-6'>
          <Spinner />
        </div>
      )}
    </div>
  );
}
