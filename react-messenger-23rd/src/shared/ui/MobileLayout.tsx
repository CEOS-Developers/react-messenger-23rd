import { Outlet, useLocation } from 'react-router-dom';

import StatusBar from './StatusBar';

const MobileLayout = () => {
  const location = useLocation();

  const isChatRoomPage = location.pathname.startsWith('/chat/');
  const statusBarBgClass = isChatRoomPage ? 'bg-bg' : 'bg-white';

  return (
    <div className="flex min-h-screen items-center justify-center bg-section-bg">
      <div className="flex h-[812px] w-[375px] flex-col overflow-hidden rounded-[40px] border border-border relative">
        <StatusBar className={statusBarBgClass} />
        <div className="flex-1 min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
