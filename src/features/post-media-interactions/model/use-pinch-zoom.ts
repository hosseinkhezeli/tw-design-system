'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Point = {
  x: number;
  y: number;
};

type TransformState = {
  scale: number;
  x: number;
  y: number;
};

type UsePinchZoomOptions = {
  minScale?: number;
  maxScale?: number;
  panOnlyWhenZoomed?: boolean;
};

const BASE_TRANSFORM: TransformState = {
  scale: 1,
  x: 0,
  y: 0,
};

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const midpoint = (a: Point, b: Point): Point => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
});

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function usePinchZoom({
  minScale = 1,
  maxScale = 3,
  panOnlyWhenZoomed = true,
}: UsePinchZoomOptions = {}) {
  const [transform, setTransform] = useState<TransformState>(BASE_TRANSFORM);
  const [isInteracting, setIsInteracting] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const activePointersRef = useRef(new Map<number, Point>());
  const lastPointersRef = useRef(new Map<number, Point>());
  const startGestureRef = useRef<{
    transform: TransformState;
    distance: number;
    midpoint: Point;
  } | null>(null);

  const frameRef = useRef<number | null>(null);
  const nextTransformRef = useRef<TransformState>(BASE_TRANSFORM);

  const commitTransform = useCallback((next: TransformState) => {
    nextTransformRef.current = next;

    if (frameRef.current != null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setTransform(nextTransformRef.current);
    });
  }, []);

  const resetZoom = useCallback(() => {
    activePointersRef.current.clear();
    lastPointersRef.current.clear();
    startGestureRef.current = null;
    setIsInteracting(false);
    commitTransform(BASE_TRANSFORM);
  }, [commitTransform]);

  useEffect(() => {
    return () => {
      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const updateFromTwoPointers = useCallback(() => {
    const points = [...activePointersRef.current.values()];
    if (points.length < 2 || !startGestureRef.current) return;

    const currentDistance = distance(points[0], points[1]);
    const currentMid = midpoint(points[0], points[1]);
    const gestureStart = startGestureRef.current;

    const nextScale = clamp(
      gestureStart.transform.scale * (currentDistance / gestureStart.distance),
      minScale,
      maxScale,
    );

    const deltaX = currentMid.x - gestureStart.midpoint.x;
    const deltaY = currentMid.y - gestureStart.midpoint.y;

    commitTransform({
      scale: nextScale,
      x: gestureStart.transform.x + deltaX,
      y: gestureStart.transform.y + deltaY,
    });
  }, [commitTransform, maxScale, minScale]);

  const updateFromOnePointer = useCallback(
    (pointerId: number) => {
      if (panOnlyWhenZoomed && transform.scale <= 1) return;

      const current = activePointersRef.current.get(pointerId);
      const last = lastPointersRef.current.get(pointerId);

      if (!current || !last) return;

      const dx = current.x - last.x;
      const dy = current.y - last.y;

      commitTransform({
        ...transform,
        x: transform.x + dx,
        y: transform.y + dy,
      });
    },
    [commitTransform, panOnlyWhenZoomed, transform],
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      const point = { x: event.clientX, y: event.clientY };

      activePointersRef.current.set(event.pointerId, point);
      lastPointersRef.current.set(event.pointerId, point);

      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // no-op
      }

      if (activePointersRef.current.size === 2) {
        const [a, b] = [...activePointersRef.current.values()];

        startGestureRef.current = {
          transform,
          distance: distance(a, b),
          midpoint: midpoint(a, b),
        };

        setIsInteracting(true);
      }
    },
    [transform],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!activePointersRef.current.has(event.pointerId)) return;

      const nextPoint = { x: event.clientX, y: event.clientY };
      const previousPoint = lastPointersRef.current.get(event.pointerId);

      activePointersRef.current.set(event.pointerId, nextPoint);
      lastPointersRef.current.set(event.pointerId, nextPoint);

      if (activePointersRef.current.size === 2) {
        setIsInteracting(true);
        updateFromTwoPointers();
        return;
      }

      if (activePointersRef.current.size === 1 && previousPoint) {
        updateFromOnePointer(event.pointerId);
      }
    },
    [updateFromOnePointer, updateFromTwoPointers],
  );

  const endPointer = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      activePointersRef.current.delete(event.pointerId);
      lastPointersRef.current.delete(event.pointerId);

      try {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch {
        // no-op
      }

      if (activePointersRef.current.size < 2) {
        startGestureRef.current = null;
        setIsInteracting(false);
      }

      if (activePointersRef.current.size === 0) {
        if (transform.scale <= 1.01) {
          resetZoom();
          return;
        }

        commitTransform({
          ...transform,
          scale: clamp(transform.scale, 1, maxScale),
        });
      }
    },
    [commitTransform, maxScale, resetZoom, transform],
  );

  const onPointerCancel = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      endPointer(event);
    },
    [endPointer],
  );

  const style = useMemo<React.CSSProperties>(
    () => ({
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
      transformOrigin: 'center center',
      touchAction: transform.scale > 1 ? 'none' : 'pan-y',
      willChange: 'transform',
      transition: isInteracting ? 'none' : 'transform 180ms ease-out',
      cursor: transform.scale > 1 ? 'grab' : 'zoom-in',
    }),
    [isInteracting, transform],
  );

  return {
    containerRef,
    transform,
    style,
    isInteracting,
    isZoomed: transform.scale > 1.01,
    resetZoom,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endPointer,
      onPointerCancel,
      onLostPointerCapture: endPointer,
    },
  };
}
