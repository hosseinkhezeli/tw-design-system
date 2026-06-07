import { HighlightItem } from './highlight-item';

export function HighlightList({ items, onSelect }: any) {
  return (
    <>
      {items.map((h: any) => (
        <HighlightItem
          key={h.id}
          title={h.title}
          cover={h.cover}
          onClick={() => onSelect(h.id)}
        />
      ))}
    </>
  );
}
