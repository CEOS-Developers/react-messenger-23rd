import { useNavigate } from "react-router-dom";
import type { ChatRoom } from "@/store/useChatStore";
import { useChatStore } from "@/store/useChatStore";
import { formatTime } from "@/utils/formatTime";
import ChatThumbnail from "@/components/chat/ChatThumbnail";

interface ChatRoomItemProps {
  chatRoom: ChatRoom;
}

const ChatRoomItem = ({ chatRoom }: ChatRoomItemProps) => {
  const navigate = useNavigate();
  const { users, messages, currentUserId } = useChatStore();

  const participants = users.filter(
    (u) => u.id !== currentUserId && chatRoom.participantIds.includes(u.id),
  );
  const roomMessages = messages.filter((m) => m.chatRoomId === chatRoom.id);
  const lastMessage = roomMessages[roomMessages.length - 1];
  const roomName = participants.map((u) => u.name).join(", ");
  const unreadCount = roomMessages.filter((m) => !m.readBy.includes(1)).length;

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-01"
      onClick={() => navigate(`/chat/${chatRoom.id}`)}
    >
      <ChatThumbnail participants={participants} />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <span className="text-body-01 text-gray-06">{roomName}</span>
          {lastMessage && (
            <span className="text-caption-2 text-gray-04 shrink-0 ml-2">
              {formatTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-body-04 text-gray-04 truncate flex-1">
            {lastMessage?.text ?? ""}
          </p>
          {unreadCount > 0 && (
            <span className="ml-2 min-w-5 h-5 px-1 rounded-full bg-main-green text-white text-caption-2 flex items-center justify-center shrink-0">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoomItem;
