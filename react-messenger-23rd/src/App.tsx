import { useChatStore } from "@/stores/useChatStore";
import ChatListPage from "@/pages/ChatListPage";
import ChatRoomPage from "@/pages/ChatRoomPage";

function App() {
  const activeChatRoomId = useChatStore((state) => state.activeChatRoomId);

  return (
    <div className="mx-auto max-w-[390px] h-dvh bg-white overflow-hidden">
      {activeChatRoomId ? <ChatRoomPage /> : <ChatListPage />}
    </div>
  );
}

export default App;
