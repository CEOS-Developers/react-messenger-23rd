import { useState } from 'react';

import BottomTabBar from '@/widgets/chat-list/ui/BottomTabBar';
import MyProfileHeader from '@/widgets/my-profile/ui/MyProfileHeader';
import ProfileIdSection from '@/widgets/my-profile/ui/ProfileIdSection';
import ProfileInfoSection from '@/widgets/my-profile/ui/ProfileInfoSection';
import ProfileMenuList from '@/widgets/my-profile/ui/ProfileMenuList';

const MyProfilePage = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);

  const handleShowToast = () => {
    setIsToastOpen(true);

    setTimeout(() => {
      setIsToastOpen(false);
    }, 2000);
  };

  return (
    <main className="flex h-full flex-col bg-white">
      <MyProfileHeader />
      <section className="flex-1 overflow-y-auto scrollbar-hide">
        <ProfileInfoSection />
        <ProfileIdSection onCopy={handleShowToast} />
        <ProfileMenuList />
      </section>

      {isToastOpen && (
        <div className="pointer-events-none absolute bottom-[105px] left-1/2 z-50 -translate-x-1/2">
          <div className="rounded-[8px] bg-gray-80 px-4 py-2">
            <span className="Body03M whitespace-nowrap text-white">복사가 완료되었습니다</span>
          </div>
        </div>
      )}

      <BottomTabBar />
    </main>
  );
};

export default MyProfilePage;
