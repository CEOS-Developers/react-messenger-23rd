import { ChatCategory } from '@/components/chat/ChatCategory';
import { SearchBar } from '@/components/utils/SearchBar';
import { NavBar } from '@/components/utils/Navbar';
import { MainChatHeader } from '@/components/chat/MainChatHeader';
import { ChatList } from '@/components/chat/ChatList';
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
