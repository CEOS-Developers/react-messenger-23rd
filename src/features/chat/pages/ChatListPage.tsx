import { useState } from "react";
import MobileLayout from "@/layouts/MobileLayout";
import BottomNavigator from "@/features/chat/components/chat-list/BottomNavigator";
import type { BottomNavigationTab } from "@/features/chat/components/chat-list/BottomNavigator";
import ChatListHeader from "@/features/chat/components/chat-list/ChatListHeader";
import ChatRoomList from "@/features/chat/components/chat-list/ChatRoomList";
import StatusBar from "@/features/chat/components/chat-room/StatusBar";
import chatRoomsData from "@/features/chat/data/chatRooms.json";

type ChatListPageProps = {
  onOpenChatRoom?: (roomId: number) => void;
  onOpenFriends?: () => void;
};

type ChatRoomUnreadSummary = {
  unreadLabel?: string;
};

type ChatListFilter = "all" | "unread";

export const chatNotificationLabel = String(
  (chatRoomsData as ChatRoomUnreadSummary[]).reduce((total, room) => {
    const unreadCount = Number.parseInt(room.unreadLabel ?? "0", 10);

    return Number.isNaN(unreadCount) ? total : total + unreadCount;
  }, 0)
);

export default function ChatListPage({
  onOpenChatRoom,
  onOpenFriends,
}: ChatListPageProps) {
  const [activeFilter, setActiveFilter] = useState<ChatListFilter>("all");

  return (
    <MobileLayout>
      <div className="flex h-full w-full flex-col bg-chat-white">
        <StatusBar backgroundColor="white" />
        <ChatListHeader
          activeFilter={activeFilter}
          unreadCountLabel={chatNotificationLabel}
          onFilterChange={setActiveFilter}
        />

        <main className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto bg-chat-white">
          <ChatRoomList
            onOpenChatRoom={onOpenChatRoom}
            showUnreadOnly={activeFilter === "unread"}
          />
        </main>

        <BottomNavigator
          activeTab="chat"
          chatNotificationLabel={chatNotificationLabel}
          onSelectTab={(tab: BottomNavigationTab) => {
            if (tab === "friends") {
              onOpenFriends?.();
            }
          }}
        />
      </div>
    </MobileLayout>
  );
}
