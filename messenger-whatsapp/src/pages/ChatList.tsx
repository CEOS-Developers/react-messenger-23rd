import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { HeaderConfig } from "@/components/Layouts/MainLayout";
import ChatRoomItem from "@/components/chat/ChatRoomItem";
import ChipFilter from "@/components/chip/ChatFilter";
import { useFilteredChatRooms } from "@/hooks/useFilteredChatRooms";
import Search from "@/assets/pageheader_search.svg?react";
import More_Square from "@/assets/pageheader_moresquare.svg?react";
import Plus from "@/assets/pageheader_add.svg?react";

const ChatList = () => {
  const { setHeaderConfig } = useOutletContext<{
    setHeaderConfig: (c: HeaderConfig) => void;
  }>();

  const {
    filteredRooms,
    filter,
    setFilter,
    unreadMessageCount,
    groupCount,
    openSwipeId,
    setOpenSwipeId,
  } = useFilteredChatRooms();

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
      <div className="border-b-1 border-gray-02 pb-4 pt-3">
        <ChipFilter
          active={filter}
          onChange={setFilter}
          unreadMessageCount={unreadMessageCount}
          groupCount={groupCount}
        />
      </div>
      <div className="no-scrollbar">
        {filteredRooms.map((room) => (
          <ChatRoomItem
            key={room.id}
            chatRoom={room}
            openId={openSwipeId}
            onSwipeOpen={setOpenSwipeId}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
