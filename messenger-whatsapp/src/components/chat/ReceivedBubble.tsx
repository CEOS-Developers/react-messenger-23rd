import { useEffect, useRef, useState } from "react";
import Tail from "../../assets/tail2.svg?react";
interface ReceivedBubbleProps {
  message: string;
  timestamp: number;
  showTime: boolean;
}

const SINGLE_LINE_HEIGHT = 37;

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours < 12 ? "오전" : "오후";
  const h = hours % 12 || 12;
  return `${ampm} ${h}:${minutes}`;
};

export default function ReceivedBubble({
  message,
  timestamp,
  showTime,
}: ReceivedBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);

  useEffect(() => {
    const el = bubbleRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setIsMultiLine(el.offsetHeight > SINGLE_LINE_HEIGHT);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex w-full px-4 justify-start">
      <div className="flex items-end gap-x-2.5 flex-row w-fit max-w-[74%]">
        <div
          ref={bubbleRef}
          className={`relative bubble text-body-03 bubble-received ${
            isMultiLine ? "bubble-multiline" : ""
          }`}
        >
          {message}

          {/* 꼬리(Tail): 겹침 정도 조정 */}
          <Tail className="absolute bottom-0 -left-[6px]" />
        </div>
        <span
          className={`typo-caption-2 text-gray-04 shrink-0 ${showTime ? "" : "invisible"}`}
        >
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
}
