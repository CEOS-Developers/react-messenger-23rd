import callOn from '../../icons/icon_callOn.svg';
import messageOn from '../../icons/icon_messageOn.svg';
import profileOn from '../../icons/icon_profileOn.svg';
import callOff from '../../icons/icon_callOff.svg';
import messageOff from '../../icons/icon_messageOff.svg';
import profileOff from '../../icons/icon_profileOff.svg';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();
  const isCall = window.location.pathname.includes('call');
  const isChat = window.location.pathname.includes('chat');
  const isProfile = window.location.pathname.includes('profile');

  const NAV_ITEMS = [
    {
      id: 'call',
      label: '통화',
      icon: isCall ? callOn : callOff,
      badge: 3,
      path: '/call',
    },
    {
      id: 'chat',
      label: '채팅',
      icon: isChat ? messageOn : messageOff,
      badge: 17,
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
    <nav className="absolute bottom-8.5 flex justify-start items-center">
      {NAV_ITEMS.map(({ id, label, icon, badge, path }) => (
        <button
          key={id}
          onClick={() => navigate(path)}
          className="w-28 h-12 relative bg-white flex flex-col justify-center items-center gap-0.5"
        >
          {/* 아이콘 및 뱃지 영역 */}
          <div className="w-6 h-6 relative shrink-0">
            <img src={icon} alt={label} className="w-full h-full" />

            {/* 읽지 않은 알림(뱃지)이 있을 경우에만 렌더링 */}
            {badge && (
              <div className="absolute -top-1 -right-3 px-1 py-0.5 bg-green-500 rounded-2xl flex justify-center items-center min-w-5">
                <span className="text-black text-xs font-normal font-['Pretendard'] leading-3">
                  {badge}
                </span>
              </div>
            )}
          </div>

          {/* 텍스트 라벨 */}
          <span className="text-black text-xs font-normal font-['Pretendard'] leading-5">
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
};
