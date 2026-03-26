import { useChatStore } from "@/stores/useChatStore";
import { useUserStore } from "@/stores/useUserStore";
import ChatListItem from "@/components/ChatListItem";
import BottomNav from "@/components/BottomNav";
import StatusBar from "@/components/StatusBar";
import SearchBar from "@/components/SearchBar";
import addChatIcon from "@/assets/icons/add-chat.svg";
import { formatTime } from "@/utils/formatTime";

export default function ChatListPage() {
  const { chatRooms, setActiveChatRoom, getLastMessage, getUnreadCount } =
    useChatStore();
  const { currentUserId, getUserById } = useUserStore();

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 h-12">
        <h1 className="text-[20px] font-semibold leading-[100%] text-content-primary">
          대화
        </h1>
        <button>
          <img src={addChatIcon} alt="새 대화" className="w-6 h-6" />
        </button>
      </div>
      <div className="pt-4 pb-5">
        <SearchBar />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chatRooms.map((room) => {
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
              onClick={() => setActiveChatRoom(room.id)}
            />
          );
        })}
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="chat" />
    </div>
  );
}
