import { Routes, Route } from "react-router-dom";
import ChatRoomPage from "./pages/ChatRoom";
import ChatListPage from "./pages/ChatList";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatRoomPage />} />

      <Route path="/chatroom" element={<ChatRoomPage />} />
      <Route path="/chatlist" element={<ChatListPage />} />

      <Route
        path="*"
        element={
          <div className="text-white">404 - 페이지를 찾을 수 없어요</div>
        }
      />
    </Routes>
  );
}

export default App;
