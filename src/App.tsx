import { useEffect, useState } from "react";
import ChatListPage, {
  chatNotificationLabel,
} from "@/features/chat/pages/ChatListPage";
import ChatRoomPage from "@/features/chat/pages/ChatRoomPage";
import FriendListPage from "@/features/chat/pages/FriendListPage";
import MyProfilePage from "@/features/chat/pages/MyProfilePage";
import SplashPage from "@/features/chat/pages/SplashPage";

type ChatView = "friends" | "list" | "profile" | "room";

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [chatView, setChatView] = useState<ChatView>("list");
  const [selectedRoomId, setSelectedRoomId] = useState(1);

  useEffect(() => {
    const splashTimerId = window.setTimeout(() => {
      setIsSplashVisible(false);
    }, 1500);

    return () => window.clearTimeout(splashTimerId);
  }, []);

  if (isSplashVisible) {
    return <SplashPage />;
  }

  if (chatView === "room") {
    return (
      <ChatRoomPage
        roomId={selectedRoomId}
        onBack={() => setChatView("list")}
      />
    );
  }

  if (chatView === "friends") {
    return (
      <FriendListPage
        chatNotificationLabel={chatNotificationLabel}
        onOpenChatList={() => setChatView("list")}
        onOpenMyProfile={() => setChatView("profile")}
      />
    );
  }

  if (chatView === "profile") {
    return <MyProfilePage />;
  }

  return (
    <ChatListPage
      onOpenFriends={() => setChatView("friends")}
      onOpenChatRoom={(roomId) => {
        setSelectedRoomId(roomId);
        setChatView("room");
      }}
    />
  );
}
