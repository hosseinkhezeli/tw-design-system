import { useVirtualizer } from '@tanstack/react-virtual';
import { MasonryPosition } from '../types';


interface UseMasonryVirtualizerOptions {
  positions: MasonryPosition[];
  getScrollElement: () => HTMLElement | null;
  overscan?: number;
}

export function useMasonryVirtualizer({
  positions,
  getScrollElement,
  overscan = 5,
}: UseMasonryVirtualizerOptions) {
  return useVirtualizer({
    count: positions.length,

    getScrollElement,

    estimateSize: (index) => {
      return positions[index]?.height ?? 300;
    },

    getItemKey: (index) => {
      return positions[index].index;
    },

    overscan,
  });
}
