import Avatar from "@/components/Avatar";
import { formatTime } from "@/utils/formatTime";

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isMine: boolean;
  senderName?: string;
  senderImage?: string;
  showSender: boolean;
  showTime: boolean;
  reactions: string[];
  onDoubleClick: () => void;
  onReactionClick: () => void;
}

export default function MessageBubble({
  content,
  timestamp,
  isMine,
  senderName,
  senderImage,
  showSender,
  showTime,
  reactions,
  onDoubleClick,
  onReactionClick,
}: MessageBubbleProps) {
  const time = formatTime(timestamp);

  const hasReaction = reactions.length > 0;

  if (isMine) {
    return (
      <div className="flex flex-col items-end">
        <div className="flex items-end gap-1">
          {showTime && (
            <span className="text-[11px] font-medium leading-[100%] text-content-secondary shrink-0">
              {time}
            </span>
          )}
          <div
            onDoubleClick={onDoubleClick}
            className="relative bg-primary text-white px-3 py-2 rounded-[16px_0px_16px_16px] max-w-[236px] break-words text-[13px] font-medium leading-[140%] cursor-pointer"
          >
            {content}
          </div>
        </div>
        {hasReaction && (
          <button
            onClick={onReactionClick}
            className="bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-sm -mt-2 mr-1 text-[14px]"
          >
            {reactions[0]}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      {showSender ? (
        <Avatar
          src={senderImage}
          name={senderName || ""}
          size="sm"
        />
      ) : (
        <div className="w-8" />
      )}
      <div className="flex flex-col gap-1">
        {showSender && (
          <span className="text-[12px] font-medium leading-[140%] tracking-[-0.03em] text-content-primary">
            {senderName}
          </span>
        )}
        <div className="flex items-end gap-1">
          <div className="flex flex-col">
            <div
              onDoubleClick={onDoubleClick}
              className="bg-white text-content-primary px-3 py-2 rounded-[0px_16px_16px_16px] max-w-[193px] break-words text-[13px] font-medium leading-[140%] cursor-pointer"
            >
              {content}
            </div>
            {hasReaction && (
              <button
                onClick={onReactionClick}
                className="bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-sm -mt-2 ml-2 text-[14px]"
              >
                {reactions[0]}
              </button>
            )}
          </div>
          {showTime && (
            <span className="text-[11px] font-medium leading-[100%] text-content-secondary shrink-0 self-end">
              {time}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
