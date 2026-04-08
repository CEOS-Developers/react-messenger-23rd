import callOn from '../../icons/icon_callOn.svg';
import messageOn from '../../icons/icon_messageOn.svg';
import profileOn from '../../icons/icon_profileOn.svg';
import callOff from '../../icons/icon_callOff.svg';
import messageOff from '../../icons/icon_messageOff.svg';
import profileOff from '../../icons/icon_profileOff.svg';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../../store/useChatStore';


export const NavBar = () => {
  const navigate = useNavigate();
  const { chatRooms } = useChatStore();
  const totalUnreadCount = chatRooms.reduce((acc, room) => acc + room.unreadCount, 0);
  const isCall = window.location.pathname.endsWith('/');
  const isChat = window.location.pathname.includes('chat');
  const isProfile = window.location.pathname.includes('profile');

  const NAV_ITEMS = [
    {
      id: 'call',
      label: '통화',
      icon: isCall ? callOn : callOff,
      badge: 3,
      path: '/',
    },
    {
      id: 'chat',
      label: '채팅',
      icon: isChat ? messageOn : messageOff,
      badge: totalUnreadCount > 99 ? '99+' : totalUnreadCount > 0 ? totalUnreadCount.toString() : undefined,
      path: '/chat',
    },
    {
      id: 'profile',
      label: '프로필',
      icon: isProfile ? profileOn : profileOff,
      path: '/profile',
    },
  ];

  return (
    <nav className="w-full absolute bottom-0 flex justify-center items-center bg-white border-t border-[0.5px] border-gray-300">
      {NAV_ITEMS.map(({ id, label, icon, badge, path }) => (
        <button
          key={id}
          onClick={() => navigate(path)}
          className="w-28 h-20.5 pt-3 relative flex flex-col justify-start items-center gap-0.5"
        >
          <div className="w-6 h-6 relative shrink-0">
            <img src={icon} alt={label} className="w-full h-full" />

            {badge && (
              <div className="absolute -top-1 -right-3 px-1.25 py-0.7 bg-green200 rounded-[15px] flex justify-center items-center min-w-5">
                <span className="text-caption-12">
                  {badge}
                </span>
              </div>
            )}
          </div>

          {/* 텍스트 라벨 */}
          <span className="text-caption-12">
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
};
