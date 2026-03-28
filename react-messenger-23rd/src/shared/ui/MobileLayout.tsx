import type { ReactNode } from 'react';

import StatusBar from './StatusBar';

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-section-bg)]">
      <div className="flex h-[812px] w-[375px] flex-col overflow-hidden rounded-[40px] border border-[var(--color-border)]">
        <StatusBar />
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
