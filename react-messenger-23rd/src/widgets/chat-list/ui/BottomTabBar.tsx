import { Link, useLocation } from 'react-router-dom';

import rawChatRooms from '@/entities/chat-room/model/chatRooms.json';
import type { ChatRoom } from '@/entities/chat-room/model/types';
import navIcon from '@/shared/assets/icons/chat-list/compass-03.svg';
import chattingIcon from '@/shared/assets/icons/chat-list/Icon.svg';
import activeChattingIcon from '@/shared/assets/icons/chat-list/Icon-active.svg';
import myProfileIcon from '@/shared/assets/icons/chat-list/user-circle.svg';
import activeMyProfileIcon from '@/shared/assets/icons/chat-list/user-circle-active.svg';
import partnerIcon from '@/shared/assets/icons/chat-list/users-01.svg';
import activePartnerIcon from '@/shared/assets/icons/chat-list/users-01-active.svg';

const CHAT_ROOMS_STORAGE_KEY = 'chat-rooms';
const initialChatRooms = rawChatRooms as ChatRoom[];

const getStoredChatRooms = (): ChatRoom[] => {
  const storedRooms = localStorage.getItem(CHAT_ROOMS_STORAGE_KEY);

  if (!storedRooms) return initialChatRooms;

  return JSON.parse(storedRooms) as ChatRoom[];
};

const BottomTabBar = () => {
  const location = useLocation();

  const isChatPage = location.pathname === '/' || location.pathname.startsWith('/chat');
  const isFriendsPage = location.pathname.startsWith('/friends');
  const isMyProfilePage = location.pathname.startsWith('/my-profile');

  const unreadCount = getStoredChatRooms().reduce((sum, room) => {
    return sum + (room.unreadCount ?? 0);
  }, 0);

  const badgeText = unreadCount > 999 ? '999+' : unreadCount;

  return (
    <nav className="border-t border-gray-20 bg-white px-6 pt-2 pb-8">
      <div className="flex items-end justify-between">
        <Link to="/" className="flex w-12 flex-col items-center gap-1 p-1">
          <div className="relative">
            <img src={isChatPage ? activeChattingIcon : chattingIcon} alt="채팅" className="h-7 w-6" />

            {unreadCount > 0 && (
              <div className="absolute -top-1 left-3 px-1 min-w-[22px] h-5 rounded-[24px] bg-main flex items-center justify-center">
                <span className="Caption01M leading-none text-white">{badgeText}</span>
              </div>
            )}
          </div>

          <span className={isChatPage ? 'Caption03SB text-gray-80' : 'Caption03SB text-gray-60'}>채팅</span>
        </Link>

        <Link to="/friends" className="flex w-12 flex-col items-center gap-1 p-1">
          <img src={isFriendsPage ? activePartnerIcon : partnerIcon} alt="대화상대" className="h-6 w-6" />
          <span className={isFriendsPage ? 'Caption03SB text-gray-80' : 'Caption03SB text-gray-60'}>대화 상대</span>
        </Link>

        <button type="button" className="flex w-12 flex-col items-center gap-1 p-1">
          <img src={navIcon} alt="검색" className="h-6 w-6" />
          <span className="Caption03SB text-gray-60">검색</span>
        </button>

        <Link to="/my-profile" className="flex w-12 flex-col items-center gap-1 p-1">
          <img src={isMyProfilePage ? activeMyProfileIcon : myProfileIcon} alt="내 프로필" className="h-6 w-6" />
          <span className={isMyProfilePage ? 'Caption03SB text-gray-80' : 'Caption03SB text-gray-60'}>내 프로필</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomTabBar;
