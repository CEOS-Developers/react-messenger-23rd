import { useEffect, useRef, useState } from "react";

/**
 * 엘리먼트의 높이가 단일 행 높이를 초과하면 isMultiLine = true
 * @param singleLineHeight 1줄일 때의 기준 높이(px)
 */
export const useMultiLineDetection = (singleLineHeight: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setIsMultiLine(el.offsetHeight > singleLineHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [singleLineHeight]);

  return { ref, isMultiLine };
};
