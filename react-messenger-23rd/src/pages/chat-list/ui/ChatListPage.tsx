import BottomTabBar from '@/widgets/chat-list/ui/BottomTabBar';
import ChatListHeader from '@/widgets/chat-list/ui/ChatListHeader';
import ChatListSearch from '@/widgets/chat-list/ui/ChatListSearch';
import ChatRoomList from '@/widgets/chat-list/ui/ChatRoomList';

const ChatListPage = () => {
  return (
    <main className="flex h-full flex-col bg-white">
      <div className="flex-1 scrollbar-hide overflow-y-auto">
        <ChatListHeader />
        <ChatListSearch />
        <ChatRoomList />
      </div>

      <BottomTabBar />
    </main>
  );
};

export default ChatListPage;
