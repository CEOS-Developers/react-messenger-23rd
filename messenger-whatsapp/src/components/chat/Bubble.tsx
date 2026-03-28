import { useEffect, useRef, useState } from "react";
import SentTail from "../../assets/tail.svg?react";
import ReceivedTail from "../../assets/tail2.svg?react";

interface BubbleProps {
  message: string;
  timestamp: number;
  showTime: boolean;
  isSent: boolean;
  unreadCount: number;
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

export default function Bubble({
  message,
  timestamp,
  showTime,
  isSent,
  unreadCount,
}: BubbleProps) {
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
    <div
      className={`flex w-full px-4 ${isSent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-end gap-x-2.5 max-w-[74%] ${isSent ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          ref={bubbleRef}
          className={`relative bubble typo-body-03 ${isSent ? "bubble-sent" : "bubble-received"} ${isMultiLine ? "bubble-multiline" : ""}`}
        >
          {message}
          {isSent ? (
            <SentTail className="absolute bottom-0 -right-[6px]" />
          ) : (
            <ReceivedTail className="absolute bottom-0 -left-[6px]" />
          )}
        </div>

        {/* 읽음 수 + 시간 */}
        <div
          className={`flex flex-col shrink-0 gap-0 pb-0 ${isSent ? "items-end" : "items-start"}`}
        >
          {isSent && unreadCount > 0 && (
            <span className="typo-caption-2  text-main-green">
              {unreadCount}
            </span>
          )}
          <span
            className={`typo-caption-2  text-gray-04 ${showTime ? "" : "invisible"}`}
          >
            {formatTime(timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}
