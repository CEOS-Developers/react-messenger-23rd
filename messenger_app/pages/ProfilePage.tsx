import { ProfileHeader } from '../src/components/profile/ProfileHeader';
import { NavBar } from '../src/components/utils/Navbar';
import my_profile from '../src/assets/my_profile.png';
import arrow_left from '../src/icons/icon_arrow_left.svg';

export const ProfilePage = () => {
  return (
    <div className="w-full h-screen bg-gray-200">
      <ProfileHeader />

      <div className="flex flex-col justify-center items-center pt-3 gap-2">
        <img src={my_profile} alt="" className="w-35 rounded-full" />
        <p className="text-body-02 text-Purple">편집</p>
      </div>

      <div className="flex flex-col px-4 mt-6">
        <p className="text-body-04 text-Gray600 ml-4 mb-1.5">상태</p>
        <div className="self-stretch pl-4 py-2 bg-white rounded-lg inline-flex justify-start items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="justify-center text-body-02">WhatsApp 사용 중!</div>
          </div>
          <img src={arrow_left} alt="" />
        </div>
      </div>

      <NavBar />
    </div>
  );
};