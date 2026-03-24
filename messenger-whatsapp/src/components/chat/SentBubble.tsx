import { useEffect, useRef, useState } from "react";

interface SentBubbleProps {
  message: string;
  timestamp: number;
  showTime: boolean;
}

const TAIL_PATH =
  "M14.8164 18.0001C16.1116 18.0001 16.4649 16.4601 15.2639 16.0317C12.1436 14.9303 10.0235 12.2378 10 9.27002V0.662354H7.58679V1.57003C7.58679 6.16963 5.17299 10.4123 1.14606 13.1047C0.839919 13.3087 0.6633 13.635 0.698624 13.9716C0.722173 14.3082 0.934115 14.6141 1.27558 14.7875C5.29074 16.8374 10.0241 17.9797 14.8164 18.0001Z";

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
    <div className="flex px-4 justify-end">
      <div className="flex items-end gap-x-2.5 flex-row-reverse max-w-[74%]">
        <div
          ref={bubbleRef}
          className={`bubble typo-body-03 bubble-sent ${isMultiLine ? "bubble-multiline" : ""}`}
        >
          {message}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            style={{ position: "absolute", bottom: 0, right: -6 }}
          >
            <path d={TAIL_PATH} fill="#00AD59" />
          </svg>
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
