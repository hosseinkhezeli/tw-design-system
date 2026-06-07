'use client';
import { CreateHighlightButton } from '@/features/highlight/ui/create-highlight-button';
import { HighlightList } from '@/features/highlight/ui/highlight-list';
import { cn } from '@/shared/utils';
import { ComponentProps } from 'react';

type Props = ComponentProps<'ul'>;

export function ProfileHighlightsList({ className, ...props }: Props) {
  return (
    <ul
      className={cn(
        'flex overflow-y-hidden overflow-x-auto w-full no-scrollbar gap-4 snap-x snap-mandatory',
        className,
      )}
      {...props}
    >
      <CreateHighlightButton />
      <HighlightList
        items={[
          {
            id: 1,
            title: 'فروش فوق‌العاده',
            cover:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJEFNYx3d2sd1N8QPrARg0F7PvaJYkT_V9g&s',
          },
          {
            id: 2,
            title: 'فروش فوق‌العاده',
            cover:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJEFNYx3d2sd1N8QPrARg0F7PvaJYkT_V9g&s',
          },
          {
            id: 3,
            title: 'فروش فوق‌العاده',
            cover:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJEFNYx3d2sd1N8QPrARg0F7PvaJYkT_V9g&s',
          },
          {
            id: 3,
            title: 'فروش فوق‌العاده',
            cover:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJEFNYx3d2sd1N8QPrARg0F7PvaJYkT_V9g&s',
          },
          {
            id: 4,
            title: 'فروش فوق‌العاده',
            cover:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJEFNYx3d2sd1N8QPrARg0F7PvaJYkT_V9g&s',
          },
          {
            id: 5,
            title: 'فروش فوق‌العاده',
            cover:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJEFNYx3d2sd1N8QPrARg0F7PvaJYkT_V9g&s',
          },
          {
            id: 6,
            title: 'فروش فوق‌العاده',
            cover:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJEFNYx3d2sd1N8QPrARg0F7PvaJYkT_V9g&s',
          },
        ]}
      />
    </ul>
  );
}
