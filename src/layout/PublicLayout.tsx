import { Outlet } from "react-router-dom";

import StatusBar from "@/assets/images/StatusBar.svg?react";
import NavibarWithIndicator from "@/components/Common/NavibarWithIndicator";

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="relative flex h-203 w-93.75 flex-col overflow-hidden bg-white shadow-md">
        <StatusBar />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="bg-indicator w-full">
            <div className="px-5">
              <NavibarWithIndicator />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicLayout;
