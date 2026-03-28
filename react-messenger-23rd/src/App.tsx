// 앱의 루트 컴포넌트.
import ChatRoomPage from '@/pages/chat-room/ui/ChatRoomPage';
import MobileLayout from '@/shared/ui/MobileLayout';

const App = () => {
  return (
    <MobileLayout>
      <ChatRoomPage />
    </MobileLayout>
  );
};

export default App;
