import { Outlet } from "react-router-dom";
import TopBar from "@/components/common/TopBar";
import BottomNav from "@/components/common/BottomNav";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar />
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
