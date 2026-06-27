'use client';

import { useRef, useState, useEffect, useCallback, ReactNode } from 'react';
import { useMasonryLayout } from '../hooks/use-masonry-layout';
import { useMasonryVirtualizer } from '../hooks/use-masonry-virtualizer';


interface MasonryFeedProps<T> {
  items: T[];

  renderItem: (args: {
    item: T;
    index: number;
    measureRef: (node: HTMLElement | null) => void;
  }) => ReactNode;

  getItemId: (item: T) => string;

  getItemAspectRatio: (item: T) => {
    width: number;
    height: number;
  };

  estimateExtraHeight?: (item: T) => number;

  columns?: number;
  gap?: number;
  overscan?: number;
}

export function MasonryFeed<T>({
  items,

  renderItem,

  getItemId,
  getItemAspectRatio,

  estimateExtraHeight,

  columns = 2,
  gap = 8,
  overscan = 5,
}: MasonryFeedProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) return;

    const update = () => {
      setContainerWidth(element.clientWidth);
    };

    update();

    const observer = new ResizeObserver(update);

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const { positions, totalHeight, createMeasureRef } = useMasonryLayout({
    items,
    containerWidth,

    columns,
    gap,

    getItemId,
    getItemAspectRatio,

    estimateExtraHeight,
  });

  const virtualizer = useMasonryVirtualizer({
    positions,
    overscan,
    getScrollElement: useCallback(() => {
      return scrollRef.current;
    }, []),
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={scrollRef}
      className='overflow-y-auto overflow-x-hidden h-full w-full'
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: totalHeight,
        }}
      >
        {virtualItems.map((virtualItem) => {
          const position = positions[virtualItem.index];

          if (!position) return null;

          const item = items[position.index];

          return (
            <div
              key={getItemId(item)}
              style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: position.width,
              }}
            >
              {renderItem({
                item,
                index: position.index,
                measureRef: createMeasureRef(item),
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
