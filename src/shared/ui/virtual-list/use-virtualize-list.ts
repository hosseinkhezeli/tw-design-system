import { useVirtualizer } from '@tanstack/react-virtual';
import { VirtualListProps } from './types';
import { VIRTUAL_LIST_CONFIG } from './list.constant';

type Props<T> = Pick<VirtualListProps<T>, 'getItemId' | 'totalCount'> & {
  getScrollElement: () => HTMLDivElement | null;
  estimateSize: () => number;
  overscan: number;
  gap: number;
};

export function useVirtualizeList<T>({
  totalCount,
  getItemId,
  getScrollElement,
  estimateSize = () => VIRTUAL_LIST_CONFIG.ESTIMATED_ITEM_SIZE,
  gap = VIRTUAL_LIST_CONFIG.GAP,
  overscan = VIRTUAL_LIST_CONFIG.OVERSCAN,
}: Props<T>) {
  const virtualizer = useVirtualizer({
    count: totalCount,
    getScrollElement: getScrollElement,
    getItemKey: getItemId,
    estimateSize,
    overscan,
    gap,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();
  const measureEl = virtualizer.measureElement;

  return { virtualItems, totalHeight, measureEl };
}
