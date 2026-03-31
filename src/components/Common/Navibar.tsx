import { useLocation, useNavigate } from "react-router-dom";

import ChatIcon from "@/assets/icons/chats.svg?react";
import ProfileCircleIcon from "@/assets/icons/profile_circle.svg?react";
import SettingIcon from "@/assets/icons/setting.svg?react";
import Alert from "@/components/Common/Alert";
import Profile from "@/components/Common/Profile";
import { NAV_ITEMS } from "@/constants/navItems";
import { useChatStore } from "@/store/chatStore";
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
  const chatRooms = useChatStore(state => state.chatRooms);

  const totalUnreadCount = Object.values(chatRooms).reduce((acc, room) => {
    return acc + room.messages.filter(m => m.userId !== 1 && !m.isRead).length;
  }, 0);

  return (
    <nav className="rounded-100 shadow-box flex w-full flex-row items-center bg-white p-1">
      {NAV_ITEMS.map(({ path, label }) => {
        const Icon = ICON_MAP[path];
        const isActive = pathname.startsWith(path);
        const isChat = path === "/chat";

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
              <div className="relative">
                <Icon className="size-6" />
                {isChat && totalUnreadCount > 0 && (
                  <div className="absolute -top-2 -right-1">
                    <Alert count={totalUnreadCount} />
                  </div>
                )}
              </div>
            )}
            <span className="font-caption-1">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navibar;
