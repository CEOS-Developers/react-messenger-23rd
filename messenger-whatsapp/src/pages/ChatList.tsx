import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { HeaderConfig } from "@/components/Layouts/MainLayout";
import ChatRoomItem from "@/components/chat/ChatRoomItem";
import { useChatStore } from "@/store/useChatStore";
import Search from "@/assets/pageheader_search.svg?react";
import More_Square from "@/assets/pageheader_moresquare.svg?react";
import Plus from "@/assets/pageheader_add.svg?react";

const ChatList = () => {
  const { setHeaderConfig } =
    useOutletContext<{ setHeaderConfig: (c: HeaderConfig) => void }>();
  const { chatRooms } = useChatStore();

  useEffect(() => {
    setHeaderConfig({
      title: "대화",
      right: (
        <>
          <Search />
          <More_Square />
          <Plus />
        </>
      ),
    });
  }, [setHeaderConfig]);

  return (
    <div className="flex flex-col">
      <div className="no-scrollbar">
        {chatRooms.map((room) => (
          <ChatRoomItem key={room.id} chatRoom={room} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
