import ChatRoomItem from "@/components/chat/ChatRoomItem";
import { useChatStore } from "@/store/useChatStore";
import Search from "@/assets/pageheader_search.svg?react";
import More_Square from "@/assets/pageheader_moresquare.svg?react";
import Plus from "@/assets/pageheader_add.svg?react";
import PageHeader from "@/components/common/PageHeader";

const ChatList = () => {
  const { chatRooms } = useChatStore();

  return (
    <div className="flex flex-col">
      <PageHeader
        title="대화"
        right={
          <>
            <Search />
            <More_Square />
            <Plus />
          </>
        }
      />
      <div className="no-scrollbar">
        {chatRooms.map((room) => (
          <ChatRoomItem key={room.id} chatRoom={room} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
