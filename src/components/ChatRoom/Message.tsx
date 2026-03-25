import ChatBox from "@/components/ChatRoom/ChatBox";
import ChatRead from "@/components/ChatRoom/ChatRead";
import Profile from "@/components/Common/Profile";

interface MessageProps {
  type: "my" | "friend";
  message: string;
  time: string;
  isRead: boolean;
  name?: string;
  isFirst?: boolean;
  showReadStatus?: boolean;
}

const Message = ({
  type,
  message,
  time,
  isRead,
  name = "",
  isFirst = false,
  showReadStatus = false,
}: MessageProps) => {
  const isMy = type === "my";

  if (isMy) {
    return (
      <div className="flex w-full items-end justify-end px-4">
        <div className="flex items-end gap-2">
          {showReadStatus && <ChatRead type="my" isRead={isRead} time={time} />}
          <ChatBox type="my" message={message} isFirst={isFirst} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-end justify-start px-4">
      <div className="flex items-end gap-2">
        {isFirst ? (
          <div className="self-start">
            <Profile name={name} type="chatroom" />
          </div>
        ) : (
          <div className="size-7.5 shrink-0" />
        )}
        <ChatBox type="friend" message={message} isFirst={isFirst} />
        {showReadStatus && <ChatRead type="friend" isRead={isRead} time={time} />}
      </div>
    </div>
  );
};

export default Message;
