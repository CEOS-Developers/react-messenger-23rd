
import { ChatCategory } from '../src/components/chat/ChatCategory';
import { SearchBar } from '../src/components/utils/SearchBar';
import { NavBar } from '../src/components/utils/Navbar';
import { MainChatHeader } from '../src/components/chat/MainChatHeader';
import { ChatList } from '../src/components/chat/ChatList';
import { useState } from 'react';

export const ChatListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col py-1.25">
      <MainChatHeader chatTitle="채팅"/>

      <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>

      <ChatCategory/>

      <ChatList />

      <NavBar/>
    </div>
  );
};
