import qr from '@/icons/icon_qr.svg';
import setting from '@/icons/icon_setting.svg';

export const ProfileHeader = () => {
  return (
    <div className="flex flex-col px-4 py-1.25">
      <div className="flex w-full justify-between items-center h-11">
        <div />
        <div className="flex flex-row gap-3">
          <img src={qr} alt="" className="w-6 h-6" />
          <img src={setting} className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
