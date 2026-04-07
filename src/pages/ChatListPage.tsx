import { useNavigate } from "react-router-dom";
import AppBarChatList from "../components/chat-list/AppBarChatList";
import PlaceHolder from "../components/chat-list/PlaceHolder";
import CurrentPlace from "../components/chat-list/CurrentPlace";
import AlarmBox from "../components/chat-list/AlarmBox";
import NavBarChatList from "../components/chat-list/NavBarChatList";
function ChatListPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col">
      <AppBarChatList />
      <PlaceHolder />
      <CurrentPlace />
      <AlarmBox />

      <button onClick={() => navigate("/chat/1")}>1번 채팅방 들어가기</button>

      <NavBarChatList />
    </div>
  );
}

export default ChatListPage;
