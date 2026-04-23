import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "@/stores/useChatStore";
import { useUserStore } from "@/stores/useUserStore";
import ChatListItem from "@/components/ChatListItem";
import BottomNav from "@/components/BottomNav";
import StatusBar from "@/components/StatusBar";
import SearchBar from "@/components/SearchBar";
import IconAddChat from "@/assets/icons/icon_add_chat.svg?react";
import { formatTime } from "@/utils/formatTime";

export default function ChatListPage() {
  const { chatRooms, setActiveChatRoom, getLastMessage, getUnreadCount, getMessagesByChatRoomId } =
    useChatStore();
  const { currentUserId, getUserById } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredRooms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return chatRooms;

    return chatRooms.filter((room) => {
      if (room.name.toLowerCase().includes(query)) return true;
      return getMessagesByChatRoomId(room.id).some((msg) =>
        msg.content.toLowerCase().includes(query),
      );
    });
  }, [chatRooms, searchQuery, getMessagesByChatRoomId]);

  const handleRoomClick = (roomId: number) => {
    setActiveChatRoom(roomId);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 h-12">
        <h1 className="text-h2 text-content-primary">
          대화
        </h1>
        <button>
          <IconAddChat className="w-6 h-6" aria-label="새 대화" />
        </button>
      </div>
      <div className="flex flex-col py-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        {chatRooms.length === 0 && (
          <span className="mt-25 self-center text-body2-r text-content-hint">
            현재 참여 중인 대화방이 없습니다.
          </span>
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredRooms.map((room) => {
          const lastMsg = getLastMessage(room.id);
          const participant = room.participantIds.find(
            (id) => id !== currentUserId,
          );
          const user =
            participant !== undefined ? getUserById(participant) : undefined;

          return (
            <ChatListItem
              key={room.id}
              name={room.name}
              profileImage={user?.profileImage || ""}
              lastMessage={lastMsg?.content || ""}
              lastMessageTime={lastMsg ? formatTime(lastMsg.timestamp) : ""}
              unreadCount={getUnreadCount(room.id, currentUserId)}
              onClick={() => handleRoomClick(room.id)}
            />
          );
        })}
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="chat" />
    </div>
  );
}
