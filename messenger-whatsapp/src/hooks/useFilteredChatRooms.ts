import { useMemo, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import type { FilterType } from "@/components/chip/ChatFilter";

const MY_ID = 1;

export function useFilteredChatRooms() {
  const { chatRooms, messages, favorites } = useChatStore();
  const [filter, setFilter] = useState<FilterType>("all");
  const [openSwipeId, setOpenSwipeId] = useState<number | null>(null);

  const unreadMessageCount = useMemo(
    () => messages.filter((m) => !m.readBy.includes(MY_ID)).length,
    [messages],
  );

  const groupCount = useMemo(
    () => chatRooms.filter((room) => room.participantIds.length >= 3).length,
    [chatRooms],
  );

  // 메시지 배열을 한 번만 순회해서 방별 최신 타임스탬프 맵 생성
  const lastMessageTimeMap = useMemo(() => {
    const map = new Map<number, number>();
    for (const m of messages) {
      if ((map.get(m.chatRoomId) ?? 0) < m.timestamp) {
        map.set(m.chatRoomId, m.timestamp);
      }
    }
    return map;
  }, [messages]);

  const filteredRooms = useMemo(
    () =>
      chatRooms
        .filter((room) => {
          if (filter === "unread")
            return messages.some(
              (m) => m.chatRoomId === room.id && !m.readBy.includes(MY_ID),
            );
          if (filter === "group") return room.participantIds.length >= 3;
          if (filter === "favorites") return favorites.includes(room.id);
          return true;
        })
        .sort(
          (a, b) =>
            (lastMessageTimeMap.get(b.id) ?? 0) -
            (lastMessageTimeMap.get(a.id) ?? 0),
        ),
    [chatRooms, messages, filter, favorites, lastMessageTimeMap],
  );

  return {
    filteredRooms,
    filter,
    setFilter,
    unreadMessageCount,
    groupCount,
    openSwipeId,
    setOpenSwipeId,
  };
}
