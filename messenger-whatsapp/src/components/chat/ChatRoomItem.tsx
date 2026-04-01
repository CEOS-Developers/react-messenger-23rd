import { useNavigate } from "react-router-dom";
import type { ChatRoom } from "../../store/useChatStore";
import { useChatStore } from "../../store/useChatStore";
import { findPartner } from "../../utils/chatUtils";
import { formatTime } from "../../utils/formatTime";

interface ChatRoomItemProps {
  chatRoom: ChatRoom;
}

const ChatRoomItem = ({ chatRoom }: ChatRoomItemProps) => {
  const navigate = useNavigate();
  const { users, messages, currentUserId } = useChatStore();

  const partner = findPartner(users, chatRoom.participantIds, currentUserId);
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
          <span className="text-body-01 text-gray-06">
            {partner?.name ?? ""}
          </span>
          {lastMessage && (
            <span className="text-caption-2 text-gray-04 shrink-0 ml-2">
              {formatTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        <p className="text-body-04 text-gray-04 truncate">
          {lastMessage?.text ?? ""}
        </p>
      </div>
    </div>
  );
};

export default ChatRoomItem;
