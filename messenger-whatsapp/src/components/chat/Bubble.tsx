import clsx from "clsx";
import SentTail from "../../assets/tail.svg?react";
import ReceivedTail from "../../assets/tail2.svg?react";
import { useMultiLineDetection } from "../../hooks/useMultiLineDetection";
import { formatTime } from "../../utils/formatTime";

interface BubbleProps {
  message: string;
  timestamp: number;
  showTime: boolean;
  isSent: boolean;
  unreadCount: number;
}

// text-body-03: font-size 14px, line-height 150% = 21px + padding 8px*2 = 37px
const SINGLE_LINE_HEIGHT = 37;

export default function Bubble({
  message,
  timestamp,
  showTime,
  isSent,
  unreadCount,
}: BubbleProps) {
  const { ref, isMultiLine } = useMultiLineDetection(SINGLE_LINE_HEIGHT);

  return (
    <div
      className={clsx(
        "flex w-full px-4",
        isSent ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={clsx(
          "flex items-end gap-x-2.5 max-w-[74%]",
          isSent ? "flex-row-reverse" : "flex-row",
        )}
      >
        <div
          ref={ref}
          className={clsx(
            "relative bubble text-body-03 break-all",
            isSent ? "bubble-sent" : "bubble-received",
            isMultiLine && "bubble-multiline",
          )}
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
          className={clsx(
            "flex flex-col shrink-0",
            isSent ? "items-end" : "items-start",
          )}
        >
          {isSent && unreadCount > 0 && (
            <span className="text-caption-2 text-main-green">
              {unreadCount}
            </span>
          )}
          <span
            className={clsx(
              "text-caption-2 text-gray-04",
              !showTime && "invisible",
            )}
          >
            {formatTime(timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}
