import { Link } from "react-router-dom";

import ChatListItem from "@/components/ChatList/ChatListItem";
import Header from "@/components/Common/Header";
import useScrolled from "@/hooks/useScrolled";
import { useChatStore } from "@/store/chatStore";
import { getUserById } from "@/utils/getUser";

const ChatListPage = () => {
  const { scrolled, handleScroll } = useScrolled();
  const chatRooms = useChatStore(state => state.chatRooms);

  return (
    <div className="flex h-full flex-col">
      <Header text="대화" showShadow={scrolled} />
      <main className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        {Object.values(chatRooms).map(chatRoom => {
          const lastMessage = chatRoom.messages[chatRoom.messages.length - 1];
          const profiles = chatRoom.friendUserIds.map(id => getUserById(id)).filter(Boolean);
          if (!lastMessage || profiles.length === 0) return null;
          return (
            <Link key={chatRoom.chatRoomId} to={`/chat/${chatRoom.chatRoomId}`}>
              <ChatListItem
                profiles={profiles as NonNullable<ReturnType<typeof getUserById>>[]}
                lastMessage={lastMessage.message}
                time={lastMessage.time}
                isRead={lastMessage.isRead}
              />
            </Link>
          );
        })}
      </main>
    </div>
  );
};

export default ChatListPage;
