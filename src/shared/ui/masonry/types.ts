import { VirtualItem } from '@tanstack/react-virtual';
import { ReactNode } from 'react';

export interface MasonryListProps<T> {
  totalCount: number;
  items: T[];
  renderItem: (args: { item: T; index: number }) => ReactNode;
  getItemId?: (index: number) => VirtualItem['key'];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void | Promise<void>;
}
