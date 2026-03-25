import { Outlet, useMatch } from "react-router-dom";

import StatusBar from "@/assets/images/StatusBar.svg?react";
import HomeIndicator from "@/components/Common/HomeIndicator";
import Navibar from "@/components/Common/Navibar";

const PublicLayout = () => {
  const isChatRoom = useMatch("/chat/:id");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="relative flex h-203 w-93.75 flex-col overflow-hidden bg-white shadow-md">
        <StatusBar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 ${!isChatRoom && "bg-indicator"}`}
        >
          {!isChatRoom && (
            <div className="px-4">
              <Navibar />
            </div>
          )}
          <HomeIndicator className="pt-5.25 pb-2" />
        </div>
      </main>
    </div>
  );
};

export default PublicLayout;
