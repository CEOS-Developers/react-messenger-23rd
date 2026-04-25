// 앱의 루트 컴포넌트.
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ChatListPage from '@/pages/chat-list/ui/ChatListPage';
import ChatRoomPage from '@/pages/chat-room/ui/ChatRoomPage';
import FriendsPage from '@/pages/friends/ui/FriendsPage';
import MobileLayout from '@/shared/ui/MobileLayout';

import MyProfilePage from './pages/my-profile/ui/MyProfilePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/" element={<ChatListPage />} />
          <Route path="/chat/:id" element={<ChatRoomPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
