import { ProfileHeader } from '../src/components/profile/ProfileHeader';
import { NavBar } from '../src/components/utils/Navbar';
import profile_me from '../src/assets/profile_me.png';
import arrow_left from '../src/icons/icon_arrow_left.svg';

export const ProfilePage = () => {
  return (
    <div className="w-full h-screen bg-Gray200">
      <ProfileHeader />

      <div className="flex flex-col justify-center items-center pt-3 gap-2">
        <img src={profile_me} alt="" className="w-35 rounded-full" />
        <p className="text-body-02 text-Purple">편집</p>
      </div>

      <div className="flex flex-col px-4 mt-6">
        <label className="text-body-04 text-Gray600 ml-4 mb-1.5">상태</label>
        <div className="self-stretch pl-4 py-2 bg-white rounded-lg inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="justify-center text-body-02">WhatsApp 사용 중!</div>
          </div>
          <img src={arrow_left} alt="" className='mx-3 w-4 h-4' />
        </div>
      </div>

      <div className="flex flex-col px-4 mt-6">
        <label className="text-body-04 text-Gray600 ml-4 mb-1.5">이름</label>
        <div className="self-stretch pl-4 py-2 bg-white rounded-lg inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="justify-center text-body-02">예린</div>
          </div>
          <img src={arrow_left} alt="" className='mx-3 w-4 h-4' />
        </div>
      </div>

      <div className="flex flex-col px-4 mt-6">
        <label className="text-body-04 text-Gray600 ml-4 mb-1.5">전화번호</label>
        <div className="self-stretch pl-4 py-2 bg-white rounded-lg inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="justify-center text-body-02">+82 10-2513-9327</div>
          </div>
          <img src={arrow_left} alt="" className='mx-3 w-4 h-4' />
        </div>
      </div>

      <div className="flex flex-col px-4 mt-6">
        <div className="self-stretch pl-4 py-2 bg-white rounded-lg inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-4">
            <div className="justify-center text-body-02 text-Purple">링크 추가</div>
          </div>
          <img src={arrow_left} alt="" className='mx-3 w-4 h-4' />
        </div>
      </div>

      <NavBar />
    </div>
  );
};
