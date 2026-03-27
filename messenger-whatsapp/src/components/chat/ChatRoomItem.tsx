import { useNavigate } from "react-router-dom";
import type { ChatRoom, User, Message } from "../../store/useChatStore";

interface ChatRoomItemProps {
  chatRoom: ChatRoom;
  currentUserId: number;
  users: User[];
  messages: Message[];
}

const formatTime = (ts: number) => {
  const d = new Date(ts);
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours < 12 ? "오전" : "오후";
  return `${ampm} ${hours % 12 || 12}:${minutes}`;
};

const ChatRoomItem = ({
  chatRoom,
  currentUserId,
  users,
  messages,
}: ChatRoomItemProps) => {
  const navigate = useNavigate();
  const partner = users.find(
    (u) => u.id !== currentUserId && chatRoom.participantIds.includes(u.id),
  );
  const roomMessages = messages.filter((m) => m.chatRoomId === chatRoom.id);
  const lastMessage = roomMessages[roomMessages.length - 1];

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 cursor-pointer active:bg-gray-01"
      onClick={() => navigate(`/chat/${chatRoom.id}`)}
    >
      <div className="w-12 h-12 rounded-full bg-gray-02 shrink-0 overflow-hidden">
        {partner?.profileImage && (
          <img
            src={partner.profileImage}
            alt={partner.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <span className="typo-body-01 text-gray-06">
            {partner?.name ?? ""}
          </span>
          {lastMessage && (
            <span className="typo-caption-2 text-gray-04 shrink-0 ml-2">
              {formatTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        <p className="typo-body-04 text-gray-04 truncate">
          {lastMessage?.text ?? ""}
        </p>
      </div>
    </div>
  );
};

export default ChatRoomItem;
