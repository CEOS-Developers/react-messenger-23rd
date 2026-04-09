import dollarIcon from '@/shared/assets/icons/my-profile/currency-dollar-circle.svg';
import smileIcon from '@/shared/assets/icons/my-profile/face-smile.svg';
import filesIcon from '@/shared/assets/icons/my-profile/folder-download (1).svg';
import imageIcon from '@/shared/assets/icons/my-profile/image-03.svg';
import settingIcon from '@/shared/assets/icons/my-profile/settings-02 (1).svg';
import starIcon from '@/shared/assets/icons/my-profile/star-01.svg';

import ProfileMenuItem from './ProfileMenuItem';

const ProfileMenuList = () => {
  return (
    <div>
      <section className="border-t border-gray-20 mb-4">
        <ProfileMenuItem icon={starIcon} label="즐겨찾기" />
        <div className="mx-4 border-t border-gray-20" />

        <ProfileMenuItem icon={imageIcon} label="모멘트" />
        <div className="mx-4 border-t border-gray-20" />

        <ProfileMenuItem icon={smileIcon} label="스티커 갤러리" />
        <div className="mx-4 border-gray-20" />
      </section>

      <section className="border-t border-gray-20">
        <ProfileMenuItem icon={filesIcon} label="내 파일 보관함" />
        <div className="mx-4 border-t border-gray-20" />

        <ProfileMenuItem icon={dollarIcon} label="결제 및 서비스" />
        <div className="mx-4 border-t border-gray-20" />

        <ProfileMenuItem icon={settingIcon} label="설정" />
        <div className="mx-4 border-t border-gray-20" />
      </section>
    </div>
  );
};

export default ProfileMenuList;
