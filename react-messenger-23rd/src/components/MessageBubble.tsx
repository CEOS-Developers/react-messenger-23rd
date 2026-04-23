import { memo, useCallback } from "react";
import Avatar from "@/components/Avatar";
import { formatTime } from "@/utils/formatTime";
import IconHeart from "@/assets/icons/icon_heart.svg?react";

interface MessageBubbleProps {
  messageId: number;
  content: string;
  timestamp: string;
  isMine: boolean;
  senderName?: string;
  senderImage?: string;
  showSender: boolean;
  showTime: boolean;
  reactions: string[];
  onReaction: (messageId: number) => void;
}

function ReactionBadge({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center justify-center py-0.5 pl-1.5 pr-2 gap-1 bg-surface-reaction rounded-[50px]"
    >
      <IconHeart className="w-3 h-3 text-primary" aria-hidden="true" />
      <span className="text-caption1 text-white">
        {count}
      </span>
    </button>
  );
}

export default memo(function MessageBubble({
  messageId,
  content,
  timestamp,
  isMine,
  senderName,
  senderImage,
  showSender,
  showTime,
  reactions,
  onReaction,
}: MessageBubbleProps) {
  const time = formatTime(timestamp);
  const hasReaction = reactions.length > 0;

  const handleDoubleClick = useCallback(() => onReaction(messageId), [onReaction, messageId]);

  if (isMine) {
    return (
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-end gap-1">
          {showTime && (
            <span className="text-caption2 text-content-tertiary shrink-0">
              {time}
            </span>
          )}
          <div
            onDoubleClick={handleDoubleClick}
            className="bg-primary text-white px-3 py-2 rounded-[16px_0px_16px_16px] max-w-59 wrap-break-word text-body3-m cursor-pointer"
          >
            {content}
          </div>
        </div>
        {hasReaction && (
          <ReactionBadge count={reactions.length} onClick={handleDoubleClick} />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      {showSender ? (
        <Avatar src={senderImage} name={senderName || ""} size="sm" />
      ) : (
        <div className="w-8" />
      )}
      <div className="flex flex-col gap-1">
        {showSender && (
          <span className="text-caption1 tracking-[-0.03em] text-content-primary">
            {senderName}
          </span>
        )}
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-end gap-1">
            <div
              onDoubleClick={handleDoubleClick}
              className="bg-white text-content-primary px-3 py-2 rounded-[0px_16px_16px_16px] max-w-48.25 wrap-break-word text-body3-m cursor-pointer"
            >
              {content}
            </div>
            {showTime && (
              <span className="text-caption2 text-content-tertiary shrink-0">
                {time}
              </span>
            )}
          </div>
          {hasReaction && (
            <ReactionBadge count={reactions.length} onClick={handleDoubleClick} />
          )}
        </div>
      </div>
    </div>
  );
});
