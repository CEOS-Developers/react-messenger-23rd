import Avatar from "@/components/Avatar";
import { formatTime } from "@/utils/formatTime";
import heartIcon from "@/assets/icons/heart.svg";

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

function ReactionBadge({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center justify-center py-0.5 pl-1.5 pr-2 gap-1 bg-line rounded-[50px]"
    >
      <img src={heartIcon} alt="heart" className="w-3 h-3" />
      <span className="text-[12px] font-medium leading-[140%] text-white">{count}</span>
    </button>
  );
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
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-end gap-1">
          {showTime && (
            <span className="text-[11px] font-medium leading-[100%] text-content-secondary shrink-0">
              {time}
            </span>
          )}
          <div
            onDoubleClick={onDoubleClick}
            className="bg-primary text-white px-3 py-2 rounded-[16px_0px_16px_16px] max-w-[236px] break-words text-[13px] font-medium leading-[140%] cursor-pointer"
          >
            {content}
          </div>
        </div>
        {hasReaction && (
          <ReactionBadge count={reactions.length} onClick={onReactionClick} />
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
          <span className="text-[12px] font-medium leading-[140%] tracking-[-0.03em] text-content-primary">
            {senderName}
          </span>
        )}
        <div className="flex items-end gap-1">
          <div className="flex flex-col items-start gap-1">
            <div
              onDoubleClick={onDoubleClick}
              className="bg-white text-content-primary px-3 py-2 rounded-[0px_16px_16px_16px] max-w-[193px] break-words text-[13px] font-medium leading-[140%] cursor-pointer"
            >
              {content}
            </div>
            {hasReaction && (
              <ReactionBadge count={reactions.length} onClick={onReactionClick} />
            )}
          </div>
          {hasReaction && (
            <ReactionBadge count={reactions.length} onClick={onReactionClick} />
          )}
        </div>
      </div>
    </div>
  );
}
