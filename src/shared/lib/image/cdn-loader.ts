'use client';

type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function cdnImageLoader({ src, width, quality }: LoaderProps) {
  if (src.startsWith('/') || src.startsWith('data:')) {
    return src;
  }

  const params = new URLSearchParams({
    w: width.toString(),
    q: (quality || 75).toString(),
  });

  return `${src}?${params.toString()}`;
}
