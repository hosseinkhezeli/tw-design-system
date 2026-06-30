import { VirtualItem } from '@tanstack/react-virtual';
import { ReactNode } from 'react';

export type VirtualListProps<T> = {
  estimateSize?: () => number;
  overscan?: number;
  gap?: number;
  className?: string;
  itemClassName?: string;
  scrollContainerClassName?: string;
  totalCount: number;
  items: T[];
  renderItem: (args: { item: T; index: number }) => ReactNode;
  getItemId?: (index: number) => VirtualItem['key'];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore?: () => void | Promise<void>;
};
