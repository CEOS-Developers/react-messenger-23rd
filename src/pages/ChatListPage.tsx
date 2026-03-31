import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import ChatListItem from "@/components/ChatList/ChatListItem";
import CreateChatButton from "@/components/ChatList/CreateChatButton";
import Header from "@/components/Common/Header";
import SearchBar from "@/components/Common/SearchBar";
import { PINNED_CHAT_ROOM_ID } from "@/constants/chatRoom";
import useScrolled from "@/hooks/useScrolled";
import { useChatStore } from "@/store/chatStore";
import { getChatTimestamp } from "@/utils/formatTime";
import { getUserById } from "@/utils/getUser";

const ChatListPage = () => {
  const { scrolled, handleScroll } = useScrolled();
  const chatRooms = useChatStore(state => state.chatRooms);
  const [searchQuery, setSearchQuery] = useState("");

  const sortedChatRooms = useMemo(() => {
    const roomsArray = Object.values(chatRooms);
    const pinnedRoom = roomsArray.find(r => r.chatRoomId === PINNED_CHAT_ROOM_ID);
    const otherRooms = roomsArray
      .filter(r => r.chatRoomId !== PINNED_CHAT_ROOM_ID)
      .sort((a, b) => getChatTimestamp(b) - getChatTimestamp(a));
    return pinnedRoom ? [pinnedRoom, ...otherRooms] : otherRooms;
  }, [chatRooms]);

  const filteredChatRooms = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return sortedChatRooms;
    return sortedChatRooms.filter(room =>
      room.friendUserIds
        .map(id => getUserById(id))
        .filter(Boolean)
        .some(user => user!.name.includes(query)),
    );
  }, [sortedChatRooms, searchQuery]);

  return (
    <div className="relative flex h-full flex-col">
      <Header text="대화" showShadow={scrolled} />
      <main className="flex flex-1 flex-col overflow-y-auto" onScroll={handleScroll}>
        <SearchBar placeholder="Search Chats" value={searchQuery} onChange={setSearchQuery} />
        <div className="mt-5 mb-28">
          {filteredChatRooms.map(chatRoom => {
            const lastMessage = chatRoom.messages[chatRoom.messages.length - 1];
            const profiles = chatRoom.friendUserIds.map(id => getUserById(id)).filter(Boolean);
            if (!lastMessage || profiles.length === 0) return null;
            const alertCount = chatRoom.messages.filter(m => m.userId !== 1 && !m.isRead).length;

            return (
              <Link key={chatRoom.chatRoomId} to={`/chat/${chatRoom.chatRoomId}`}>
                <ChatListItem
                  profiles={profiles as NonNullable<ReturnType<typeof getUserById>>[]}
                  lastMessage={lastMessage.message}
                  time={lastMessage.time}
                  isRead={lastMessage.isRead}
                  isFixed={chatRoom.chatRoomId === PINNED_CHAT_ROOM_ID}
                  alertCount={alertCount}
                />
              </Link>
            );
          })}
        </div>
      </main>
      <div className="absolute right-4 bottom-30">
        <CreateChatButton />
      </div>
    </div>
  );
};

export default ChatListPage;
