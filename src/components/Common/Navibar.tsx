import { useLocation, useNavigate } from "react-router-dom";

import ChatIcon from "@/assets/icons/chats.svg?react";
import ProfileCircleIcon from "@/assets/icons/profile_circle.svg?react";
import SettingIcon from "@/assets/icons/setting.svg?react";
import Profile from "@/components/Common/Profile";
import { NAV_ITEMS } from "@/constants/navItems";
import { cn } from "@/utils/cn";
import { getUserById } from "@/utils/getUser";

const ICON_MAP = {
  "/chat": ChatIcon,
  "/contact": ProfileCircleIcon,
  "/setting": SettingIcon,
  "/profile": ProfileCircleIcon,
} as const;

const Navibar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const myUser = getUserById(1);

  return (
    <nav className="rounded-100 shadow-box flex w-full flex-row items-center bg-white p-1">
      {NAV_ITEMS.map(({ path, label }) => {
        const Icon = ICON_MAP[path];
        const isActive = pathname.startsWith(path);
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "rounded-100 flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 px-4 py-1 transition-colors duration-400 ease-in-out",
              isActive ? "bg-primary-100 text-primary-400" : "text-gray-500",
            )}
          >
            {path === "/profile" ? (
              <div className="flex flex-col items-center gap-0.5 p-0.5">
                <Profile
                  name={myUser?.name ?? ""}
                  profileColor={myUser?.profileColor ?? ""}
                  type="navibar"
                />
              </div>
            ) : (
              <Icon className="size-6" />
            )}
            <span className="font-caption-1">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navibar;
