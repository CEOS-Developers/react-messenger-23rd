import Avatar from "@/components/Avatar";

interface ChatListItemProps {
  name: string;
  profileImage?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  onClick: () => void;
}

export default function ChatListItem({
  name,
  profileImage,
  lastMessage,
  lastMessageTime,
  unreadCount,
  onClick,
}: ChatListItemProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center w-full px-5 py-3 gap-3 h-[68px] active:bg-surface-pressed"
    >
      <Avatar src={profileImage} name={name} />
      <div className="flex-1 min-w-0 flex flex-col gap-1 text-left">
        <div className="flex items-start justify-between">
          <p className="text-[14px] font-normal leading-[140%] text-content-primary truncate max-w-[218px]">
            {name}
          </p>
          {unreadCount > 0 && (
            <span className="bg-primary text-white text-[12px] font-normal leading-[140%] text-center rounded-full min-w-4 h-4 flex items-center justify-center px-1 shrink-0">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-end justify-between">
          <p className="text-[13px] font-light leading-[100%] text-content-secondary truncate max-w-[218px]">
            {lastMessage}
          </p>
          <span className="text-[11px] font-normal leading-[100%] text-content-secondary shrink-0">
            {lastMessageTime}
          </span>
        </div>
      </div>
    </button>
  );
}
