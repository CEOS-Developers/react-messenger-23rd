import { BrowserRouter, Routes, Route } from "react-router-dom";
import FriendsPage from "@/pages/FriendsPage";
import ChatListPage from "@/pages/ChatListPage";
import ChatRoomPage from "@/pages/ChatRoomPage";
import MyProfilePage from "@/pages/MyProfilePage";

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto max-w-97.5 h-dvh bg-white overflow-hidden shadow-lg">
        <Routes>
          <Route path="/" element={<FriendsPage />} />
          <Route path="/chat" element={<ChatListPage />} />
          <Route path="/chat/:id" element={<ChatRoomPage />} />
          <Route path="/profile" element={<MyProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
