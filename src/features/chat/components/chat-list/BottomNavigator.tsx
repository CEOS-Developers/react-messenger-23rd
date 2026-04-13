import CountBadge from "@/features/chat/components/chat-list/CountBadge";

export type BottomNavigationTab = "friends" | "chat" | "more";

export type BottomNavigatorProps = {
  activeTab?: BottomNavigationTab;
  chatNotificationLabel?: string;
  onSelectTab?: (tab: BottomNavigationTab) => void;
};

type NavigationIconProps = {
  isActive: boolean;
};

const NAV_ITEMS = [
  {
    tab: "friends",
    label: "친구",
  },
  {
    tab: "chat",
    label: "채팅",
  },
  {
    tab: "more",
    label: "더보기",
  },
] satisfies {
  tab: BottomNavigationTab;
  label: string;
}[];

function getIconColorClassName(isActive: boolean) {
  return isActive ? "text-chat-gray-700" : "text-chat-gray-300";
}

function FriendIcon({ isActive }: NavigationIconProps) {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon h-[24px] w-[24px] ${getIconColorClassName(isActive)}`}
    >
      <path
        d="M12 11C14.7614 11 17 8.76142 17 6C17 3.23858 14.7614 1 12 1C9.23858 1 7 3.23858 7 6C7 8.76142 9.23858 11 12 11Z"
        fill="currentColor"
      />
      <path
        d="M2 19.4303C2 16.7165 3.97722 14.3793 6.64451 13.8792C10.1502 13.2218 13.8498 13.2218 17.3555 13.8792C20.0228 14.3793 22 16.7165 22 19.4303C22 20.9876 20.7376 22.25 19.1803 22.25H4.81971C3.26243 22.25 2 20.9876 2 19.4303Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChatIcon({ isActive }: NavigationIconProps) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon h-[24px] w-[24px] ${getIconColorClassName(isActive)}`}
    >
      <path
        d="M10 0C4.47714 0 0 3.67812 0 8.21549C0 11.1102 1.82667 13.6498 4.58 15.1131L3.52333 18.6878C3.45905 18.9048 3.69762 19.0841 3.88333 18.9584L7.89381 16.2449C8.57333 16.3648 9.27714 16.431 10 16.431C15.5229 16.431 20 12.7529 20 8.21549C20 3.67812 15.5229 0 10 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MeatballIcon({ isActive }: NavigationIconProps) {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon h-[24px] w-[24px] ${getIconColorClassName(isActive)}`}
    >
      <circle cx="4" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="20" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function NavigationIcon({
  tab,
  isActive,
}: {
  tab: BottomNavigationTab;
  isActive: boolean;
}) {
  if (tab === "friends") {
    return <FriendIcon isActive={isActive} />;
  }

  if (tab === "chat") {
    return <ChatIcon isActive={isActive} />;
  }

  return <MeatballIcon isActive={isActive} />;
}

export default function BottomNavigator({
  activeTab = "chat",
  chatNotificationLabel,
  onSelectTab,
}: BottomNavigatorProps) {
  return (
    <nav
      aria-label="하단 탭"
      className="flex w-full shrink-0 flex-col items-center justify-center gap-[4px] rounded-t-[16px] border-t border-chat-gray-150 bg-[#F5F5F7] px-[16px] py-[8px] md:pb-0"
    >
      <div className="flex items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = item.tab === activeTab;

          return (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className="relative flex h-[40px] w-[104px] items-center justify-center gap-[10px]"
              onClick={() => onSelectTab?.(item.tab)}
            >
              <NavigationIcon tab={item.tab} isActive={isActive} />

              {item.tab === "chat" && chatNotificationLabel !== undefined ? (
                <CountBadge
                  label={chatNotificationLabel}
                  className="absolute top-[4px] left-[52px] z-10"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="hidden h-[34px] w-full items-center justify-center pt-[21px] pb-[8px] md:flex">
        <div className="h-[5px] w-[134px] rounded-[100px] bg-chat-home-indicator" />
      </div>
    </nav>
  );
}
