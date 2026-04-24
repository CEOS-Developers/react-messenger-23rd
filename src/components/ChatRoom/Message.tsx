import { memo } from "react";

import ChatBox from "@/components/ChatRoom/ChatBox";
import ChatRead from "@/components/ChatRoom/ChatRead";
import Profile from "@/components/Common/Profile";

interface MessageProps {
  type: "my" | "friend";
  message: string;
  imageUrl?: string;
  time: string;
  isRead: boolean;
  name?: string;
  profileColor?: string;
  isFirst?: boolean;
  isFirstInTimeGroup?: boolean;
  showReadStatus?: boolean;
}

const Message = ({
  type,
  message,
  imageUrl,
  time,
  isRead,
  name = "",
  profileColor = "",
  isFirst = false,
  isFirstInTimeGroup = false,
  showReadStatus = false,
}: MessageProps) => {
  const isMy = type === "my";

  if (isMy) {
    return (
      <div className="flex w-full items-end justify-end px-4">
        <div className="flex items-end gap-2">
          {showReadStatus && <ChatRead type="my" isRead={isRead} time={time} />}
          <ChatBox type="my" message={message} imageUrl={imageUrl} isFirst={isFirstInTimeGroup} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-end justify-start pr-4 pl-3">
      <div className="flex items-end gap-2">
        {isFirst || isFirstInTimeGroup ? (
          <div className="self-start">
            <Profile name={name} profileColor={profileColor} type="chatroom" />
          </div>
        ) : (
          <div className="size-7.5 shrink-0" />
        )}
        <ChatBox type="friend" message={message} imageUrl={imageUrl} isFirst={isFirstInTimeGroup} />
        {showReadStatus && <ChatRead type="friend" isRead={isRead} time={time} />}
      </div>
    </div>
  );
};

export default memo(Message);
