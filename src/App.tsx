import { useState } from "react";
import ChatListPage from "@/features/chat/pages/ChatListPage";
import ChatRoomPage from "@/features/chat/pages/ChatRoomPage";

type ChatView = "list" | "room";

export default function App() {
  const [chatView, setChatView] = useState<ChatView>("list");
  const [selectedRoomId, setSelectedRoomId] = useState(1);

  if (chatView === "room") {
    return (
      <ChatRoomPage
        roomId={selectedRoomId}
        onBack={() => setChatView("list")}
      />
    );
  }

  return (
    <ChatListPage
      onOpenChatRoom={(roomId) => {
        setSelectedRoomId(roomId);
        setChatView("room");
      }}
    />
  );
}
