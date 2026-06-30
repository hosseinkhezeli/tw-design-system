/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, useRef } from 'react';

import Img from '@/shared/ui/img';

import { useDoubleTapLike } from '../model/use-double-tap-like';
import { usePinchZoom } from '../model/use-pinch-zoom';
import { PostModel } from '@/entities/post/model/post.model';
import { IconHeartFilled } from '@tabler/icons-react';

type Props = {
  post: any;
  imageAspectRatio: number;
  imageHeight: number;
};

type StartPoint = {
  x: number;
  y: number;
};

export function PostMediaInteraction({
  post,
  imageAspectRatio,
  imageHeight,
}: Props) {
  const { post: normalizedPost } = new PostModel(post);
  const media = normalizedPost.media[0];

  const { isLiked, likesCount, showBurst, registerTap } = useDoubleTapLike({
    postId: normalizedPost.id,
    initialIsLiked: normalizedPost.viewer?.isLiked,
    initialLikesCount: normalizedPost.likesCount,
  });

  const { style: zoomStyle, bind } = usePinchZoom();

  const pointerStartsRef = useRef(new Map<number, StartPoint>());
  const activePointerCountRef = useRef(0);
  const hadMultiTouchRef = useRef(false);

  const isImageReady = Boolean(media?.url || media?.thumbnailUrl);

  const imageSrc = media?.thumbnailUrl ?? media?.url ?? '';
  const imageAlt =
    media?.altText ?? normalizedPost.title ?? normalizedPost.caption ?? '';

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartsRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    activePointerCountRef.current += 1;
    if (activePointerCountRef.current > 1) {
      hadMultiTouchRef.current = true;
    }

    bind.onPointerDown(event);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    bind.onPointerMove(event);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const startPoint = pointerStartsRef.current.get(event.pointerId);
    const endedWithSingleTouch = !hadMultiTouchRef.current;
    const movedSmallEnough =
      startPoint &&
      Math.hypot(event.clientX - startPoint.x, event.clientY - startPoint.y) <
        10;

    if (
      endedWithSingleTouch &&
      movedSmallEnough &&
      event.pointerType !== 'mouse'
    ) {
      registerTap();
    }

    pointerStartsRef.current.delete(event.pointerId);
    activePointerCountRef.current = Math.max(
      0,
      activePointerCountRef.current - 1,
    );

    if (activePointerCountRef.current === 0) {
      hadMultiTouchRef.current = false;
    }

    bind.onPointerUp(event);
  };

  const onPointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartsRef.current.delete(event.pointerId);
    activePointerCountRef.current = Math.max(
      0,
      activePointerCountRef.current - 1,
    );

    if (activePointerCountRef.current === 0) {
      hadMultiTouchRef.current = false;
    }

    bind.onPointerCancel(event);
  };

  if (!isImageReady) {
    return (
      <div
        className='relative w-full overflow-hidden bg-accent/50'
        style={{ height: imageHeight, aspectRatio: imageAspectRatio }}
      />
    );
  }

  return (
    <div
      className='relative w-full overflow-hidden bg-accent/50'
      style={{ minHeight: imageHeight, aspectRatio: imageAspectRatio }}
    >
      <div
        className='h-full w-full'
        style={zoomStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <Img
          src={imageSrc}
          alt={imageAlt}
          width={media?.width ?? 250}
          height={media?.height ?? imageHeight}
          wrapperClassName='h-full w-full'
          className='h-full w-full object-cover'
        />
      </div>

      {showBurst && (
        <div className='pointer-events-none animate-disappear delay-[360ms] absolute inset-0 flex items-center justify-center'>
          <div
            className='flex items-center animate-grow justify-center rounded-full bg-foreground/15'
            style={{
              width: 132,
              height: 132,
            }}
          >
            <IconHeartFilled className='size-12 animate-appear delay-75 opacity-0' />
          </div>
        </div>
      )}
    </div>
  );
}
