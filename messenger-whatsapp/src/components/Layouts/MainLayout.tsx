import { useState } from "react";
import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import TopBar from "@/components/common/TopBar";
import BottomNav from "@/components/common/BottomNav";
import PageHeader from "@/components/common/PageHeader";

export interface HeaderConfig {
  title?: string;
  right?: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
}

export default function MainLayout() {
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig | null>(null);

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar />
      {headerConfig && <PageHeader {...headerConfig} />}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet context={{ setHeaderConfig }} />
      </div>
      <BottomNav />
    </div>
  );
}
