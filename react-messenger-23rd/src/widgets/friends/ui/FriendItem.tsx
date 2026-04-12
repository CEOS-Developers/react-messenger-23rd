import type { Friend } from '@/entities/user/model/types';
import readIcon from '@/shared/assets/icons/friends/notification-message-read.svg';
import yetIcon from '@/shared/assets/icons/friends/notification-message-yet.svg';
import profileIcon from '@/shared/assets/icons/friends/user-02.svg';

const FriendItem = ({ friend }: { friend: Friend }) => {
  const renderStatusButton = () => {
    if (friend.status === 'none') return null;

    const iconSrc = friend.status === 'yet' ? yetIcon : readIcon;
    const iconAlt = friend.status === 'yet' ? '안 읽은 메시지 있음' : '메시지 읽음';

    return (
      <button type="button" className="flex items-center justify-center">
        <img src={iconSrc} alt={iconAlt} className="h-8 w-8" />
      </button>
    );
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-main-light2 px-[3.27px] pt-[4.5px] tb-[2.05px]">
          <img src={profileIcon} alt={`${friend.name} 프로필`} className="h-9 w-9 text-main-light" />
        </div>
        <span className="Body01M text-gray-90">{friend.name}</span>
      </div>
      {renderStatusButton()}
    </div>
  );
};

export default FriendItem;
