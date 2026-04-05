import { useNavigate } from "react-router-dom";
import AppBarChatList from "../components/chat-list/AppBarChatList";

function ChatListPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col">
      <AppBarChatList />

      <h1>채팅 목록 페이지</h1>

      <button onClick={() => navigate("/chat/1")}>1번 채팅방 들어가기</button>
    </div>
  );
}

export default ChatListPage;
