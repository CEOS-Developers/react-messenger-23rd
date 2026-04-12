import profileIcon from '@/shared/assets/icons/my-profile/user-02 (2).svg';

const ProfileInfoSection = () => {
  return (
    <section className="px-4 py-2 mb-1">
      <div className="flex gap-4">
        <div className="flex shrink-0 items-center justify-center h-16 w-16 rounded-[8px] bg-main-light2 px-[8px] pt-[10px] pb-[6px]">
          <img src={profileIcon} alt="내 프로필" className="h-12 w-12 text-main-light" />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <span className="Heading02SB text-black">고다현</span>
          <span className="Caption01R text-gray-70">잘 부탁드립니다! 고다현이라고 합니다</span>
        </div>
      </div>

      <button className="mt-5 w-full rounded-[8px] Body03M text-gray-80 bg-gray-10 px-4 py-2">프로필 수정</button>
    </section>
  );
};

export default ProfileInfoSection;
