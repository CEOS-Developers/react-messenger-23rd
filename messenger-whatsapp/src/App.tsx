import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/Layouts/MainLayout";
import ChatList from "@/pages/ChatList";
import ChatRoom from "@/pages/ChatRoom";
import Friends from "@/pages/Friends";
import Profile from "@/pages/profile/MyProfile";
import FriendProfile from "@/pages/profile/FriendProfile";

function App() {
  return (
    <div className="w-[375px] mx-auto">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Friends />} />
            <Route path="/chat" element={<ChatList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<FriendProfile />} />
          </Route>
          <Route path="/chat/:roomId" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
