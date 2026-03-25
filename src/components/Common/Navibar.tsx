import { useLocation, useNavigate } from "react-router-dom";

import ChatIcon from "@/assets/icons/chats.svg?react";
import ProfileCircleIcon from "@/assets/icons/profile_circle.svg?react";
import SettingIcon from "@/assets/icons/setting.svg?react";
import { NAV_ITEMS } from "@/constants/navItems";

const ICON_MAP = {
  "/chat": ChatIcon,
  "/contact": ProfileCircleIcon,
  "/setting": SettingIcon,
  "/profile": ProfileCircleIcon,
} as const;

const Navibar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="rounded-100 shadow-box flex w-full flex-row items-center bg-white p-1">
      {NAV_ITEMS.map(({ path, label }) => {
        const Icon = ICON_MAP[path];
        const isActive = pathname.startsWith(path);
        const activeClass = isActive ? "bg-primary-100 text-primary-400" : "text-gray-500";

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`rounded-100 flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 px-4 py-1 transition-colors ${activeClass}`}
          >
            {path === "/profile" ? (
              <div className="flex flex-col items-center gap-0.5 p-0.5">
                <div className="bg-profile-6 flex size-5 items-center justify-center rounded-full">
                  <span className="text-center text-[7px] leading-[140%] font-bold tracking-[-0.21px] text-white">
                    지민
                  </span>
                </div>
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
