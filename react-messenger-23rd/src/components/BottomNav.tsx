import { useNavigate } from "react-router-dom";
import IconHome from "@/assets/icons/icon_home.svg?react";
import IconChat from "@/assets/icons/icon_chat.svg?react";
import IconMenu from "@/assets/icons/icon_menu.svg?react";

type TabKey = "home" | "chat" | "menu";

interface BottomNavProps {
  activeTab: TabKey;
}

const tabs: {
  key: TabKey;
  label: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  path: string;
}[] = [
  {
    key: "home",
    label: "홈",
    Icon: IconHome,
    path: "/",
  },
  {
    key: "chat",
    label: "채팅",
    Icon: IconChat,
    path: "/chat",
  },
  {
    key: "menu",
    label: "메뉴",
    Icon: IconMenu,
    path: "",
  },
];

export default function BottomNav({ activeTab }: BottomNavProps) {
  const navigate = useNavigate();

  return (
    <nav className="border-t border-line-subtle bg-white px-4 pt-3 pb-8.5">
      <div className="flex items-center justify-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              className="flex flex-col items-center gap-0.5 w-28"
              onClick={() => tab.path && navigate(tab.path)}
            >
              <tab.Icon
                className={`w-8 h-8 ${
                  isActive ? "text-primary" : "text-content-inactive"
                }`}
                aria-hidden="true"
              />
              <span
                className={`text-caption1 ${
                  isActive ? "text-primary" : "text-content-inactive"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
