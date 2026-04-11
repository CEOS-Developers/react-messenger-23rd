import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { NavBar } from '@/components/utils/Navbar';
import profile_me from '@/assets/profile_me.png';
import { ProfileField } from '@/components/profile/ProfileField';

export const ProfilePage = () => {
  const PROFILE_DATA = [
    { id: 'status', label: '상태', value: 'WhatsApp 사용 중!' },
    { id: 'name', label: '이름', value: '예린' },
    { id: 'phone', label: '전화번호', value: '+82 10-2513-9327' },
    { id: 'link', value: '링크 추가', isAction: true },
  ];

  return (
    <div className="w-full h-dvh bg-Gray200 flex flex-col pb-24">
      <ProfileHeader />

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="flex flex-col justify-center items-center pt-3 gap-2">
          <img
            src={profile_me}
            alt="프로필"
            className="w-35 rounded-full object-cover"
          />
          <button className="text-body-02 text-Purple">편집</button>
        </div>

        <div className="flex flex-col">
          {PROFILE_DATA.map((item) => (
            <ProfileField
              key={item.id}
              label={item.label}
              value={item.value}
              isAction={item.isAction}
            />
          ))}
        </div>
      </div>

      <NavBar />
    </div>
  );
};
