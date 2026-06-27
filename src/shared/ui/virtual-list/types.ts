import { ReactNode } from 'react';

export type VirtualListProps<T> = {
  items: T[];

  renderItem: (item: T, index: number) => ReactNode;

  estimateSize?: number;

  overscan?: number;

  className?: string;

  itemClassName?: string;

  scrollContainerClassName?: string;

  onEndReached: () => void;

  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
