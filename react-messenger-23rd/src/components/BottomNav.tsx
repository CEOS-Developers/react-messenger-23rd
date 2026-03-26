import homeIcon from "@/assets/icons/home.svg";
import homeSelectedIcon from "@/assets/icons/home-selected.svg";
import chatIcon from "@/assets/icons/chat.svg";
import chatSelectedIcon from "@/assets/icons/chat-selected.svg";
import menuIcon from "@/assets/icons/menu.svg";

type TabKey = "home" | "chat" | "menu";

interface BottomNavProps {
  activeTab: TabKey;
}

const tabs: {
  key: TabKey;
  label: string;
  icon: string;
  selectedIcon: string;
}[] = [
  {
    key: "home",
    label: "홈",
    icon: homeIcon,
    selectedIcon: homeSelectedIcon,
  },
  {
    key: "chat",
    label: "채팅",
    icon: chatIcon,
    selectedIcon: chatSelectedIcon,
  },
  {
    key: "menu",
    label: "메뉴",
    icon: menuIcon,
    selectedIcon: menuIcon,
  },
];

export default function BottomNav({ activeTab }: BottomNavProps) {
  return (
    <nav className="border-t border-line-subtle bg-white px-4 pt-3">
      <div className="flex items-center justify-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              className="flex flex-col items-center gap-0.5 w-28"
            >
              <img
                src={isActive ? tab.selectedIcon : tab.icon}
                alt={tab.label}
                className="w-8 h-8"
              />
              <span
                className={`text-[12px] font-medium leading-[140%] ${
                  isActive ? "text-primary" : "text-line"
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
