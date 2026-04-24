import ChatRoomPage from "./pages/ChatRoomPage";
import ChatListPage from "./pages/ChatListPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="relative flex h-[var(--screen-height)] w-[var(--screen-width)] flex-col">
        <Routes>
          <Route path="/" element={<ChatListPage />} />
          <Route path="/chat/:chatRoomId" element={<ChatRoomPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
