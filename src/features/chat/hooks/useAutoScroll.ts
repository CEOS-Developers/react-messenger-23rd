import { useEffect, useRef } from "react";

export default function useAutoScroll<T>(dependency: T) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [dependency]);

  return bottomRef;
}
