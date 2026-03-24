import { useEffect, useRef, useState } from "react";

interface BubbleProps {
  message: string;
  isSent: boolean;
}

const TAIL_PATH =
  "M14.8164 18.0001C16.1116 18.0001 16.4649 16.4601 15.2639 16.0317C12.1436 14.9303 10.0235 12.2378 10 9.27002V0.662354H7.58679V1.57003C7.58679 6.16963 5.17299 10.4123 1.14606 13.1047C0.839919 13.3087 0.6633 13.635 0.698624 13.9716C0.722173 14.3082 0.934115 14.6141 1.27558 14.7875C5.29074 16.8374 10.0241 17.9797 14.8164 18.0001Z";

// typo-body-02: font-size 16px, line-height 150% = 24px, padding 8px top+bottom = 40px total for 1 line
const SINGLE_LINE_HEIGHT = 40;

export default function Bubble({ message, isSent }: BubbleProps) {
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
      className={`flex w-full px-4 py-1 ${isSent ? "justify-end" : "justify-start"}`}
    >
      <div
        ref={bubbleRef}
        className={` bubble typo-body-02 ${isSent ? "bubble-sent" : "bubble-received"} ${isMultiLine ? "bubble-multiline" : ""}`}
      >
        {message}
        {isSent ? (
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
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            style={{
              position: "absolute",
              bottom: 0,
              left: -6,
              transform: "scaleX(-1)",
            }}
          >
            <path d={TAIL_PATH} fill="#FFFFFF" />
          </svg>
        )}
      </div>
    </div>
  );
}
