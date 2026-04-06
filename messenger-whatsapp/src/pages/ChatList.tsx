import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { HeaderConfig } from "@/components/Layouts/MainLayout";
import ChatRoomItem from "@/components/chat/ChatRoomItem";
import ChipFilter, { type FilterType } from "@/components/chip/ChatFilter";
import { useChatStore } from "@/store/useChatStore";
import Search from "@/assets/pageheader_search.svg?react";
import More_Square from "@/assets/pageheader_moresquare.svg?react";
import Plus from "@/assets/pageheader_add.svg?react";

const MY_ID = 1;

const ChatList = () => {
  const { setHeaderConfig } = useOutletContext<{
    setHeaderConfig: (c: HeaderConfig) => void;
  }>();
  const { chatRooms, messages, favorites } = useChatStore();
  const [filter, setFilter] = useState<FilterType>("all");
  const [openSwipeId, setOpenSwipeId] = useState<number | null>(null);

  // 총 미읽음 메시지 수
  const unreadMessageCount = messages.filter(
    (m) => !m.readBy.includes(MY_ID),
  ).length;

  // 그룹 채팅방 수
  const groupCount = chatRooms.filter(
    (room) => room.participantIds.length >= 3,
  ).length;

  const getLastMessageTime = (roomId: number) => {
    const roomMessages = messages.filter((m) => m.chatRoomId === roomId);
    return roomMessages.length > 0
      ? roomMessages[roomMessages.length - 1].timestamp
      : 0;
  };

  const filteredRooms = chatRooms
    .filter((room) => {
      if (filter === "unread")
        return messages.some(
          (m) => m.chatRoomId === room.id && !m.readBy.includes(MY_ID),
        );
      if (filter === "group") return room.participantIds.length >= 3;
      if (filter === "favorites") return favorites.includes(room.id);
      return true;
    })
    .sort((a, b) => getLastMessageTime(b.id) - getLastMessageTime(a.id));

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
