import chatRoomsData from "@/features/chat/data/chatRooms.json";

type ChatRoomUnreadSummary = {
  unreadLabel?: string;
};

export const chatNotificationLabel = String(
  (chatRoomsData as ChatRoomUnreadSummary[]).reduce((total, room) => {
    const unreadCount = Number.parseInt(room.unreadLabel ?? "0", 10);

    return Number.isNaN(unreadCount) ? total : total + unreadCount;
  }, 0)
);
