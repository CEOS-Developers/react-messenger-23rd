import { ProfileHeader } from '../src/components/profile/ProfileHeader';
import { NavBar } from '../src/components/utils/Navbar';
import profile_me from '../src/assets/profile_me.png';
import arrow_left from '../src/icons/icon_arrow_left.svg';

interface ProfileFieldProps {
  label?: string;
  value: string;
  isAction?: boolean;
}

const ProfileField = ({ label, value, isAction }: ProfileFieldProps) => {
  return (
    <div className="flex flex-col px-4 mt-6">
      {label && (
        <label className="text-body-04 text-Gray600 ml-4 mb-1.5">{label}</label>
      )}

      <div className="self-stretch pl-4 py-2 bg-white rounded-lg inline-flex justify-between items-center cursor-pointer active:bg-gray-50">
        <div className="flex justify-start items-center gap-4">
          <div
            className={`justify-center text-body-02 ${isAction ? 'text-Purple' : ''}`}
          >
            {value}
          </div>
        </div>
        <img src={arrow_left} alt="이동" className="mx-3 w-4 h-4" />
      </div>
    </div>
  );
};

export const ProfilePage = () => {
  const PROFILE_DATA = [
    { id: 'status', label: '상태', value: 'WhatsApp 사용 중!' },
    { id: 'name', label: '이름', value: '예린' },
    { id: 'phone', label: '전화번호', value: '+82 10-2513-9327' },
    { id: 'link', value: '링크 추가', isAction: true },
  ];

  return (
    <div className="w-full h-dvh bg-Gray200 flex flex-col">
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
