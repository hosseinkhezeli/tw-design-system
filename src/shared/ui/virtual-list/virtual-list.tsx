'use client';
import { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { VirtualListProps } from './types';
import {
  DEFAULT_ESTIMATED_ITEM_SIZE,
  VIRTUAL_LIST_OVERSCAN,
} from '@/config/ui';
import { cn } from '@/shared/utils/cn';

export function VirtualList<T>({
  items,
  renderItem,
  estimateSize = DEFAULT_ESTIMATED_ITEM_SIZE,
  overscan = VIRTUAL_LIST_OVERSCAN,
  className,
  scrollContainerClassName,
  onEndReached,
}: VirtualListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,

    getScrollElement: () => parentRef.current,

    estimateSize: () => estimateSize,

    overscan,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const lastItem = virtualItems.at(-1);

  useEffect(() => {
    if (!lastItem) return;

    const nearEnd = lastItem.index >= items.length - 3;

    if (nearEnd) {
      onEndReached?.();
    }
  }, [lastItem?.index, items.length, onEndReached]);

  return (
    <div
      ref={parentRef}
      className={cn(scrollContainerClassName, 'no-scrollbar')}
    >
      <div
        className={className}
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
          width: '100%',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index];

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderItem(item, virtualItem.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
