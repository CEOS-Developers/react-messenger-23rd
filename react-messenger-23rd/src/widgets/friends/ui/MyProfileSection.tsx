import filesIcon from '@/shared/assets/icons/friends/folder-download.svg';
import profileIcon from '@/shared/assets/icons/friends/user-02.svg';

const MyProfileSection = () => {
  return (
    <section className="flex items-center justify-between px-4 py-5 mb-5">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10.7px] bg-main-light2 px-[4.36px] pt-[6px] pb-[2.73px]">
          <img src={profileIcon} alt="프로필" className="h-[39.27px] w-[39.27px] text-main-light" />
        </div>
        <span className="Heading02SB">고다현</span>
      </div>

      <button type="button" className="inline-flex items-center gap-1 rounded-[24px] border border-gray-40 px-3 py-2">
        <img src={filesIcon} alt="프로필" className="h-[18px] w-[18px] text-gray-80" />
        <span className="Body03M text-gray-80">내 파일 보관함</span>
      </button>
    </section>
  );
};

export default MyProfileSection;
