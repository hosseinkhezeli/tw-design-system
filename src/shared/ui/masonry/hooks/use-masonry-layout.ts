/* eslint-disable react-hooks/refs */
import { useMemo, useRef, useState, useCallback } from 'react';
import { MasonryPosition } from '../types';
import { MEDIA_ASPECT_RATIO } from '@/entities/media/constants/media.constants';

interface UseMasonryLayoutOptions<T> {
  items: T[];
  containerWidth: number;

  columns?: number;
  gap?: number;

  getItemId: (item: T) => string;

  getItemAspectRatio: (item: T) => {
    width: number;
    height: number;
  };

  estimateExtraHeight?: (item: T) => number;
}

export function useMasonryLayout<T>({
  items,
  containerWidth,

  columns = 2,
  gap = 8,

  getItemId,
  getItemAspectRatio,

  estimateExtraHeight,
}: UseMasonryLayoutOptions<T>) {
  const measuredHeights = useRef<Record<string, number>>({});

  const [, forceUpdate] = useState(0);

  const columnWidth = useMemo(() => {
    return (containerWidth - gap * (columns - 1)) / columns;
  }, [containerWidth, columns, gap]);

  const positions = useMemo(() => {
    const columnHeights = Array(columns).fill(0);

    const result: MasonryPosition[] = [];

    items.forEach((item, index) => {
      const id = getItemId(item);
      const isEven = index % 2 === 0;

      const height = isEven ? 333 : 250;

      const estimatedImageHeight = height;

      const estimatedHeight =
        measuredHeights.current[id] ??
        estimatedImageHeight + (estimateExtraHeight?.(item) ?? 100);

      const column = columnHeights.indexOf(Math.min(...columnHeights));

      const top = columnHeights[column];

      const left = column * (columnWidth + gap);

      result.push({
        index,
        top,
        left,
        width: columnWidth,
        height: estimatedHeight,
        column,
      });

      columnHeights[column] += estimatedHeight + gap;
    });

    return {
      positions: result,
      totalHeight: Math.max(...columnHeights, 0),
    };
  }, [items, columns, gap, columnWidth, getItemId, estimateExtraHeight]);

  const createMeasureRef = useCallback(
    (item: T) => {
      const id = getItemId(item);

      return (node: HTMLElement | null) => {
        if (!node) return;

        const observer = new ResizeObserver(([entry]) => {
          const nextHeight = entry.contentRect.height;

          if (measuredHeights.current[id] === nextHeight) {
            return;
          }

          measuredHeights.current[id] = nextHeight;

          forceUpdate((v) => v + 1);
        });

        observer.observe(node);

        return () => observer.disconnect();
      };
    },
    [getItemId],
  );

  return {
    positions: positions.positions,
    totalHeight: positions.totalHeight,
    createMeasureRef,
  };
}
