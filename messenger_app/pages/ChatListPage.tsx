
import { ChatCategory } from '../src/components/chat/ChatCategory';
import { SearchBar } from '../src/components/utils/SearchBar';
import { NavBar } from '../src/components/utils/Navbar';
import { MainChatHeader } from '../src/components/chat/MainChatHeader';

export const ChatListPage = () => {
  return (
    <div className="flex flex-col px-4 py-1.25">
      <MainChatHeader chatTitle="채팅"/>

      <SearchBar/>

      <ChatCategory/>

      <NavBar/>
    </div>
  );
};
