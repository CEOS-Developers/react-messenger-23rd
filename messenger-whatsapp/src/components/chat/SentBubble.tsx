import { useEffect, useRef, useState } from "react";
import Tail from "../../assets/tail.svg?react";

interface SentBubbleProps {
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

export default function SentBubble({
  message,
  timestamp,
  showTime,
}: SentBubbleProps) {
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
    <div className="flex px-4 justify-end w-full">
      <div className="flex items-end gap-x-2.5 flex-row-reverse max-w-[74%]">
        {/* 말풍선 본체 */}
        <div
          ref={bubbleRef}
          className={`relative bubble text-body-03 bubble-sent ${
            isMultiLine ? "bubble-multiline" : ""
          }`}
        >
          {message}

          {/* 꼬리(Tail): 겹침 정도 조정 */}
          <Tail className="absolute bottom-0 -right-[6px]" />
        </div>

        {/* 시간 표시 */}
        <span
          className={`text-caption-2 text-gray-04 shrink-0 mb-1 ${
            showTime ? "" : "invisible"
          }`}
        >
          {formatTime(timestamp)}
        </span>
      </div>
    </div>
  );
}
