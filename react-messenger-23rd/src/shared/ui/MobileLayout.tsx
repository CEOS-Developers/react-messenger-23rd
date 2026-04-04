import { Outlet } from 'react-router-dom';

import StatusBar from './StatusBar';

const MobileLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-section-bg">
      <div className="flex h-[812px] w-[375px] flex-col overflow-hidden rounded-[40px] border border-border">
        <StatusBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MobileLayout;
