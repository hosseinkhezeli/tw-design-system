'use client';

import { useState } from 'react';
import Image, { ImageProps as NextImageProps } from 'next/image';
import { Skeleton } from './skeleton';
import { IMAGE_FALLBACK_SRC } from '@/shared/config/ui';

type CommonProps = {
  alt: string;
  fallbackSrc?: string;
  wrapperClassName?: string;
};

type NativeImageProps = CommonProps &
  React.ImgHTMLAttributes<HTMLImageElement> & {
    native: true;
  };

type NextOptimizedImageProps = CommonProps &
  NextImageProps & {
    native?: false;
  };

export type ImgProps = NativeImageProps | NextOptimizedImageProps;

export default function Img(props: ImgProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const {
    alt,
    fallbackSrc = IMAGE_FALLBACK_SRC,
    wrapperClassName = '',
    native,
    src,
    className,
    ...rest
  } = props;

  const currentSrc = hasError || !src ? fallbackSrc : src;

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      className={`relative overflow-hidden bg-accent/50 ${wrapperClassName}`}
    >
      {isLoading && <Skeleton className='absolute inset-0 z-10' />}

      {native ? (
        /* --- Native HTML Image --- */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={currentSrc as string}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading='lazy'
          decoding='async'
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className || ''}`}
          {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
        />
      ) : (
        /* --- Next.js Optimized Image --- */
        <Image
          onLoad={handleLoad}
          onError={handleError}
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${hasError ? 'mix-blend-color-dodge' : ''} ${className || ''}`}
          {...(rest as NextImageProps)}
          unoptimized={hasError}
          src={currentSrc as NextImageProps['src']}
          alt={alt}
        />
      )}
    </div>
  );
}
