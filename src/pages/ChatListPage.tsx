import { useMemo, useRef, useState } from "react";
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
  const mainRef = useRef<HTMLElement>(null);

  const enrichedChatRooms = useMemo(() => {
    const roomsArray = Object.values(chatRooms).map(room => ({
      ...room,
      profiles: room.friendUserIds.map(id => getUserById(id)).filter(u => u !== undefined),
      alertCount: room.messages.filter(m => m.userId !== 1 && !m.isRead).length,
      lastMessage: room.messages.at(-1),
    }));
    const pinned = roomsArray.find(r => r.chatRoomId === PINNED_CHAT_ROOM_ID);
    const others = roomsArray
      .filter(r => r.chatRoomId !== PINNED_CHAT_ROOM_ID)
      .sort((a, b) => getChatTimestamp(b) - getChatTimestamp(a));
    return pinned ? [pinned, ...others] : others;
  }, [chatRooms]);

  const filteredChatRooms = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return enrichedChatRooms;
    return enrichedChatRooms.filter(room => room.profiles.some(u => u.name.includes(query)));
  }, [enrichedChatRooms, searchQuery]);

  return (
    <div className="relative flex h-full flex-col">
      <Header
        text="대화"
        showShadow={scrolled}
        showSearchIcon={scrolled}
        onSearchIconClick={() => {
          if (mainRef.current) mainRef.current.scrollTop = 0;
        }}
      />
      <main
        ref={mainRef}
        className="flex flex-1 flex-col overflow-y-auto scroll-smooth"
        onScroll={handleScroll}
      >
        <SearchBar placeholder="Search Chats" value={searchQuery} onChange={setSearchQuery} />
        <div className="mt-5 mb-28">
          {filteredChatRooms.map(({ chatRoomId, profiles, alertCount, lastMessage }) => {
            if (!lastMessage || profiles.length === 0) return null;
            return (
              <Link key={chatRoomId} to={`/chat/${chatRoomId}`}>
                <ChatListItem
                  profiles={profiles}
                  lastMessage={lastMessage.message}
                  time={lastMessage.time}
                  isRead={lastMessage.isRead}
                  isFixed={chatRoomId === PINNED_CHAT_ROOM_ID}
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
