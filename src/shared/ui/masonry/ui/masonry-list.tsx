import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { ReactNode, useRef } from 'react';

export type MansoryItem = VirtualItem;

type Props<MansoryItem> = {
  totalCount: number;
  items: MansoryItem[];
  renderItem: (args: { item: MansoryItem; index: number }) => ReactNode;

  getItemId?: (index: number) => VirtualItem['key'];
};

export function MasonryList<MansoryItem>({
  totalCount,
  getItemId,
  items,
  renderItem,
}: Props<MansoryItem>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: totalCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350,
    getItemKey: getItemId,
    overscan: 6,
    lanes: 2,
    gap: 8,
    laneAssignmentMode: 'measured',
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className='h-[calc(100dvh-68px)] overflow-y-auto w-full max-w-xl'
    >
      <div
        className='relative'
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        {virtualItems.map((virtualItem) => {
          const item = items[virtualItem.index]!;
          return (
            <div
              key={virtualItem.key}
              ref={virtualizer.measureElement}
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
      </div>
    </div>
  );
}
