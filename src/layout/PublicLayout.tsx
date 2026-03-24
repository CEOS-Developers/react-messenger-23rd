import { Outlet } from "react-router-dom";

// import StatusBar from "@/assets/images/StatusBar.svg?react";
import Navibar from "@/components/Common/Navibar";

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="relative h-203 w-93.75 overflow-hidden bg-white shadow-md">
        {/* <StatusBar /> */}
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
        <div className="absolute right-5 bottom-4 left-5">
          <Navibar />
        </div>
      </main>
    </div>
  );
};

export default PublicLayout;
