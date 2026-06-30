import { useVirtualizer } from '@tanstack/react-virtual';
import { MasonryListProps } from './types';
import { MASONRY_LIST_CONFIG } from './masonry.constants';

type Props<T> = Pick<MasonryListProps<T>, 'getItemId' | 'totalCount'> & {
  getScrollElement: () => HTMLDivElement | null;
};

export function useVirtualizeMasonryList<T>({
  totalCount,
  getItemId,
  getScrollElement,
}: Props<T>) {
  const virtualizer = useVirtualizer({
    count: totalCount,
    getScrollElement: getScrollElement,
    getItemKey: getItemId,
    estimateSize: () => MASONRY_LIST_CONFIG.ESTIMATED_ITEM_SIZE,
    overscan: MASONRY_LIST_CONFIG.OVERSCAN,
    lanes: MASONRY_LIST_CONFIG.COLUMN_COUNT,
    gap: MASONRY_LIST_CONFIG.GAP,
    laneAssignmentMode: MASONRY_LIST_CONFIG.LINE_ASSIGNMENT_MODE,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();
  const measureEl = virtualizer.measureElement;

  return { virtualItems, totalHeight, measureEl };
}
