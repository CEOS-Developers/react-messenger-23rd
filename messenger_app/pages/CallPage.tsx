import { useState } from 'react';
import { CallProfileList } from '@/components/call/CallProfileList';
import { MainChatHeader } from '@/components/chat/MainChatHeader';
import { NavBar } from '@/components/utils/Navbar';
import { SearchBar } from '@/components/utils/SearchBar';
import { UserSelectModal } from '@/components/call/NewChatModal';

export const CallPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    // dvh 써줘야 주소창 높이까지 계산해서 화면 꽉 채워짐
    <div className="w-full h-dvh flex flex-col py-1.25">
      <MainChatHeader
        chatTitle="통화"
        onAddClick={() => setIsModalOpen(true)}
      />

      <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <CallProfileList searchQuery={searchQuery}/>

      <NavBar />

      {isModalOpen && <UserSelectModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
