import BottomTabBar from '@/widgets/chat-list/ui/BottomTabBar';
import FriendsHeader from '@/widgets/friends/ui/FriendsHeader';
import FriendsList from '@/widgets/friends/ui/FriendsList';
import MyProfileSection from '@/widgets/friends/ui/MyProfileSection';
import TagSection from '@/widgets/friends/ui/TagSection';

const FriendsPage = () => {
  return (
    <main className="flex h-full flex-col bg-white">
      <FriendsHeader />

      <section className="flex-1 overflow-y-auto">
        <MyProfileSection />
        <TagSection />
        <FriendsList />
      </section>

      <BottomTabBar />
    </main>
  );
};

export default FriendsPage;
