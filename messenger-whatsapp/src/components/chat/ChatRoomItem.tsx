import { useNavigate } from "react-router-dom";
import type { ChatRoom } from "@/store/useChatStore";
import { useChatStore } from "@/store/useChatStore";
import { useFriendsStore } from "@/store/useFriendsStore";
import { formatLastMessageTime } from "@/utils/formatTime";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import ChatThumbnail from "@/components/chat/ChatThumbnail";
import FavoriteDefault from "@/assets/chat_fav.svg?react";
import FavoriteActive from "@/assets/chat_fav_filled.svg?react";

interface ChatRoomItemProps {
  chatRoom: ChatRoom;
  onSwipeOpen?: (id: number) => void;
  openId?: number | null;
}

const ChatRoomItem = ({ chatRoom, onSwipeOpen, openId }: ChatRoomItemProps) => {
  const navigate = useNavigate();
  const { messages, currentUserId, favorites, toggleFavorite } = useChatStore();
  const { friends } = useFriendsStore();

  const participants = friends.filter(
    (f) => f.id !== currentUserId && chatRoom.participantIds.includes(f.id),
  );
  const roomMessages = messages.filter((m) => m.chatRoomId === chatRoom.id);
  const lastMessage = roomMessages[roomMessages.length - 1];
  const roomName = participants.map((f) => f.name).join(", ");
  const unreadCount = roomMessages.filter((m) => !m.readBy.includes(1)).length;
  const isFavorite = favorites.includes(chatRoom.id);

  const {
    offsetX,
    animating,
    dragged,
    offsetRef,
    close,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
  } = useSwipeGesture({
    actionWidth: 51,
    threshold: 25,
    itemId: chatRoom.id,
    openId,
    onOpen: onSwipeOpen ?? (() => {}),
  });

  const handleContentClick = () => {
    if (dragged.current) return;
    if (offsetRef.current !== 0) { close(); return; }
    navigate(`/chat/${chatRoom.id}`);
  };

  const handleFavoriteClick = () => {
    toggleFavorite(chatRoom.id);
    close();
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-[51px] flex items-center justify-center bg-gray-02">
        <button
          onClick={handleFavoriteClick}
          className="flex items-center justify-center w-10 h-10"
        >
          {isFavorite ? (
            <FavoriteActive className="w-6 h-6" />
          ) : (
            <FavoriteDefault className="w-6 h-6" />
          )}
        </button>
      </div>

      <div
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: animating ? "transform 0.2s ease" : "none",
          userSelect: "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onClick={handleContentClick}
        className="relative flex items-center gap-3 px-4 py-3 border-b border-gray-02 bg-white cursor-pointer active:bg-gray-01"
      >
        <ChatThumbnail participants={participants} />

        <div className="flex-1 min-w-0">
          <span className="block text-body-01 text-gray-06 truncate">{roomName}</span>
          <p className="text-body-04 text-gray-04 truncate mt-0.5">
            {lastMessage?.text ?? ""}
          </p>
        </div>

        <div className="flex flex-col items-end justify-between self-stretch shrink-0">
          {lastMessage && (
            <span className="text-caption-2 text-gray-04">
              {formatLastMessageTime(lastMessage.timestamp)}
            </span>
          )}
          {unreadCount > 0 ? (
            <span className="min-w-5 h-5 px-1 rounded-full bg-main-green text-white text-caption-2 flex items-center justify-center">
              {unreadCount}
            </span>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoomItem;
