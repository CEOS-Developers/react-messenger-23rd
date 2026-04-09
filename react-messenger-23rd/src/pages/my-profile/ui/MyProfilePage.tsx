import BottomTabBar from '@/widgets/chat-list/ui/BottomTabBar';
import MyProfileHeader from '@/widgets/my-profile/ui/MyProfileHeader';
import ProfileIdSection from '@/widgets/my-profile/ui/ProfileIdSection';
import ProfileInfoSection from '@/widgets/my-profile/ui/ProfileInfoSection';
import ProfileMenuList from '@/widgets/my-profile/ui/ProfileMenuList';

const MyProfilePage = () => {
  return (
    <main className="flex h-full flex-col bg-white">
      <MyProfileHeader />
      <section className="flex-1 overflow-y-auto scrollbar-hide">
        <ProfileInfoSection />
        <ProfileIdSection />
        <ProfileMenuList />
      </section>
      <BottomTabBar />
    </main>
  );
};

export default MyProfilePage;
