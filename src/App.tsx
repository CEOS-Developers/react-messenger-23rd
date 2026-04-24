import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ChatListPage from "@/features/chat/pages/ChatListPage";
import ChatRoomPage from "@/features/chat/pages/ChatRoomPage";
import FriendListPage from "@/features/chat/pages/FriendListPage";
import MyProfilePage from "@/features/chat/pages/MyProfilePage";
import SplashPage from "@/features/chat/pages/SplashPage";
import { chatNotificationLabel } from "@/features/chat/constants/chatNotification";

const SPLASH_THEME_COLOR = "#FFE000";
const DEFAULT_THEME_COLOR = "#FFFFFF";
const CHAT_ROOM_THEME_COLOR = "#A7C8E8";

function getThemeColorMetaElement() {
  const currentMetaElement = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]'
  );

  if (currentMetaElement) return currentMetaElement;

  const metaElement = document.createElement("meta");
  metaElement.name = "theme-color";
  document.head.appendChild(metaElement);

  return metaElement;
}

function getThemeColorByPathname(pathname: string) {
  if (pathname.startsWith("/chat/")) {
    return CHAT_ROOM_THEME_COLOR;
  }

  return DEFAULT_THEME_COLOR;
}

function ChatListRoute() {
  const navigate = useNavigate();

  return (
    <ChatListPage
      onOpenFriends={() => navigate("/friends")}
      onOpenChatRoom={(roomId) => navigate(`/chat/${roomId}`)}
    />
  );
}

function FriendListRoute() {
  const navigate = useNavigate();

  return (
    <FriendListPage
      chatNotificationLabel={chatNotificationLabel}
      onOpenChatList={() => navigate("/chats")}
      onOpenMyProfile={() => navigate("/profile")}
    />
  );
}

function MyProfileRoute() {
  const navigate = useNavigate();

  return <MyProfilePage onBack={() => navigate("/friends")} />;
}

function ChatRoomRoute() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const parsedRoomId = Number.parseInt(roomId ?? "", 10);
  const currentRoomId = parsedRoomId === 2 ? 2 : 1;

  return (
    <ChatRoomPage roomId={currentRoomId} onBack={() => navigate("/chats")} />
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/chats" />} />
      <Route path="/chats" element={<ChatListRoute />} />
      <Route path="/friends" element={<FriendListRoute />} />
      <Route path="/profile" element={<MyProfileRoute />} />
      <Route path="/chat/:roomId" element={<ChatRoomRoute />} />
      <Route path="*" element={<Navigate replace to="/chats" />} />
    </Routes>
  );
}

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const splashTimerId = window.setTimeout(() => {
      setIsSplashVisible(false);
    }, 1500);

    return () => window.clearTimeout(splashTimerId);
  }, []);

  useEffect(() => {
    const themeColor = isSplashVisible
      ? SPLASH_THEME_COLOR
      : getThemeColorByPathname(location.pathname);
    const themeColorMetaElement = getThemeColorMetaElement();

    themeColorMetaElement.content = themeColor;
    document.documentElement.style.setProperty("--app-theme-color", themeColor);
    document.body.style.backgroundColor = themeColor;
  }, [isSplashVisible, location.pathname]);

  if (isSplashVisible) {
    return <SplashPage />;
  }

  return <AppRoutes />;
}
