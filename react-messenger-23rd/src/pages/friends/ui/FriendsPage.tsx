import { useState } from 'react';

import BottomTabBar from '@/widgets/chat-list/ui/BottomTabBar';
import FriendsHeader from '@/widgets/friends/ui/FriendsHeader';
import FriendsList from '@/widgets/friends/ui/FriendsList';
import MyProfileSection from '@/widgets/friends/ui/MyProfileSection';
import TagSection from '@/widgets/friends/ui/TagSection';

const FriendsPage = () => {
  const [isTagOpen, setIsTagOpen] = useState(true);
  const [isFriendsOpen, setIsFriendsOpen] = useState(true);

  return (
    <main className="flex h-full flex-col bg-white">
      <section className="flex-1 overflow-y-auto scrollbar-hide">
        <FriendsHeader />
        <MyProfileSection />

        <TagSection isOpen={isTagOpen} onToggle={() => setIsTagOpen((prev) => !prev)} />

        <FriendsList isOpen={isFriendsOpen} onToggle={() => setIsFriendsOpen((prev) => !prev)} />
      </section>

      <BottomTabBar />
    </main>
  );
};

export default FriendsPage;
