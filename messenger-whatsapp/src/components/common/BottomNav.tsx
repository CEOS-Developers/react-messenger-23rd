import { useLocation, useNavigate } from "react-router-dom";
import FriendsDefault from "@/assets/bottomnav_friends_default.svg?react";
import FriendsActive from "@/assets/bottomnav_friends_active.svg?react";
import ChatDefault from "@/assets/bottomnav_chat_default.svg?react";
import ChatActive from "@/assets/bottomnav_chat_active.svg?react";
import ProfileDefault from "@/assets/bottomnav_profile_default.svg?react";
import ProfileActive from "@/assets/bottomnav_profile_active.svg?react";

const NAV_ITEMS = [
  { path: "/", Default: FriendsDefault, Active: FriendsActive },
  { path: "/chat", Default: ChatDefault, Active: ChatActive },
  { path: "/profile", Default: ProfileDefault, Active: ProfileActive },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-around items-center px-8 py-3 bg-white border-t border-gray-02">
      {NAV_ITEMS.map(({ path, Default, Active }) => {
        const isActive = pathname === path;
        const Icon = isActive ? Active : Default;
        return (
          <button key={path} onClick={() => navigate(path)}>
            <Icon />
          </button>
        );
      })}
    </div>
  );
}
