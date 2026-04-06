import { Link, useLocation } from 'react-router-dom';

import navIcon from '@/shared/assets/icons/chat-list/compass-03.svg';
import chattingIcon from '@/shared/assets/icons/chat-list/Icon.svg';
import myProfileIcon from '@/shared/assets/icons/chat-list/user-circle.svg';
import partnerIcon from '@/shared/assets/icons/chat-list/users-01.svg';

const BottomTabBar = () => {
  const location = useLocation();

  const isChatPage = location.pathname === '/' || location.pathname.startsWith('/chat/');
  const isFriendsPage = location.pathname === '/friends';
  const isMyProfilePage = location.pathname === '/my-profile';

  const unreadCount = 1000;
  const badgeText = unreadCount > 999 ? '999+' : unreadCount;

  return (
    <nav className="border-t border-gray-20 bg-white px-6 pt-2 pb-8">
      <div className="flex items-end justify-between">
        <Link to="/" className="flex w-12 flex-col items-center gap-1 p-1">
          <div className="relative">
            <img src={chattingIcon} alt="채팅" className="h-6 w-6" />

            {unreadCount > 0 && (
              <div className="absolute -top-1 left-3 px-1 min-w-[22px] h-5 rounded-[24px] bg-main flex items-center justify-center">
                <span className="Caption01M leading-none text-white">{badgeText}</span>
              </div>
            )}
          </div>

          <span className={isChatPage ? 'Caption03SB text-gray-80' : 'Caption03SB text-gray-60'}>채팅</span>
        </Link>

        <Link to="/friends" className="flex w-12 flex-col items-center gap-1 p-1">
          <img src={partnerIcon} alt="대화상대" className="h-6 w-6" />
          <span className={isFriendsPage ? 'Caption03SB text-gray-80' : 'Caption03SB text-gray-60'}>대화 상대</span>
        </Link>

        <button type="button" className="flex w-12 flex-col items-center gap-1 p-1">
          <img src={navIcon} alt="검색" className="h-6 w-6" />
          <span className="Caption03SB text-gray-60">검색</span>
        </button>

        <Link to="/my-profile" className="flex w-12 flex-col items-center gap-1 p-1">
          <img src={myProfileIcon} alt="내 프로필" className="h-6 w-6" />
          <span className={isMyProfilePage ? 'Caption03SB text-gray-80' : 'Caption03SB text-gray-60'}>내 프로필</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomTabBar;
