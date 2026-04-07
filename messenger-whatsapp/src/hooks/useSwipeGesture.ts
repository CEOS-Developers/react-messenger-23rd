import { useCallback, useEffect, useRef, useState } from "react";

interface UseSwipeGestureOptions {
  actionWidth: number;
  threshold: number;
  itemId: number;
  openId: number | null | undefined;
  onOpen: (id: number) => void;
}

export function useSwipeGesture({
  actionWidth,
  threshold,
  itemId,
  openId,
  onOpen,
}: UseSwipeGestureOptions) {
  const [offsetX, setOffsetX] = useState(0);
  const [animating, setAnimating] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontal = useRef<boolean | null>(null);
  const baseOffset = useRef(0);
  const dragged = useRef(false);
  const offsetRef = useRef(0);
  offsetRef.current = offsetX;

  // onOpen을 ref에 저장해서 stale closure 방지
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  useEffect(() => {
    if (openId !== itemId && offsetRef.current !== 0) {
      setAnimating(true);
      setOffsetX(0);
    }
  }, [openId, itemId]);

  const close = useCallback(() => {
    setAnimating(true);
    setOffsetX(0);
  }, []);

  const dragStart = useCallback((clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    isHorizontal.current = null;
    baseOffset.current = offsetRef.current;
    dragged.current = false;
    setAnimating(false);
  }, []);

  const dragMove = useCallback(
    (clientX: number, clientY: number) => {
      const dx = clientX - startX.current;
      const dy = clientY - startY.current;

      if (isHorizontal.current === null) {
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5)
          isHorizontal.current = true;
        else if (Math.abs(dy) > 5) isHorizontal.current = false;
      }

      if (isHorizontal.current) {
        dragged.current = true;
        setOffsetX(Math.max(-actionWidth, Math.min(0, baseOffset.current + dx)));
      }
    },
    [actionWidth],
  );

  const dragEnd = useCallback(() => {
    if (!isHorizontal.current) return;
    setAnimating(true);
    if (offsetRef.current < -threshold) {
      setOffsetX(-actionWidth);
      onOpenRef.current(itemId);
    } else {
      setOffsetX(0);
    }
  }, [actionWidth, threshold, itemId]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => dragStart(e.touches[0].clientX, e.touches[0].clientY),
    [dragStart],
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => dragMove(e.touches[0].clientX, e.touches[0].clientY),
    [dragMove],
  );
  const handleTouchEnd = useCallback(() => dragEnd(), [dragEnd]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      dragStart(e.clientX, e.clientY);
      const onMove = (ev: MouseEvent) => dragMove(ev.clientX, ev.clientY);
      const onUp = () => {
        dragEnd();
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [dragStart, dragMove, dragEnd],
  );

  return {
    offsetX,
    animating,
    dragged,
    offsetRef,
    close,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
  };
}
