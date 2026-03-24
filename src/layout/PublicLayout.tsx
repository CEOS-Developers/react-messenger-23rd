import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="relative h-203 w-93.75 overflow-hidden bg-white shadow-md">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
