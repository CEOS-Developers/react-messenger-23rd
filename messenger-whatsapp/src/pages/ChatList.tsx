import TopBar from "../components/common/TopBar";
import ChatRoomItem from "../components/chat/ChatRoomItem";
import { useChatStore } from "../store/useChatStore";
import Search from "../assets/Search.svg?react";
import More_Square from "../assets/More_Square.svg?react";

import Plus from "../assets/Plus.svg?react";

const ChatList = () => {
  const { chatRooms, users, messages, currentUserId } = useChatStore();

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar />
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <h1 className="typo-headline-1 text-gray-06">대화</h1>
        <div className="flex flex-row gap-3">
          <Search />
          <More_Square />
          <Plus />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {chatRooms.map((room) => (
          <ChatRoomItem
            key={room.id}
            chatRoom={room}
            currentUserId={currentUserId}
            users={users}
            messages={messages}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
