import CountBadge from "@/features/chat/components/chat-list/CountBadge";
import UserIconSvg from "@/assets/icons/ic_User.svg";
import ChatIconSvg from "@/assets/icons/ic_Chat.svg";
import MeatballDotSvg from "@/assets/icons/ic_Meatball.svg";

type BottomNavigatorProps = {
  chatNotificationLabel?: string;
};

const NAV_ITEMS = [
  {
    label: "친구",
    icon: (
      <img
        src={UserIconSvg}
        alt=""
        className="svg-icon h-[24px] w-[24px]"
      />
    ),
  },
  {
    label: "채팅",
    icon: (
      <img
        src={ChatIconSvg}
        alt=""
        className="svg-icon h-[24px] w-[24px]"
      />
    ),
  },
  {
    label: "더보기",
    icon: <MeatballIcon />,
  },
];

function MeatballIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-[24px] w-[24px] shrink-0 items-center justify-center px-[2px]"
    >
      <span className="flex h-[4px] w-[20px] items-center gap-[4px]">
        {[0, 1, 2].map((dot) => (
          <img
            key={dot}
            src={MeatballDotSvg}
            alt=""
            className="svg-icon h-[4px] w-[4px]"
          />
        ))}
      </span>
    </span>
  );
}

export default function BottomNavigator({
  chatNotificationLabel,
}: BottomNavigatorProps) {
  return (
    <nav
      aria-label="하단 탭"
      className="flex w-full shrink-0 flex-col items-center justify-center gap-[4px] rounded-t-[16px] border-t border-chat-gray-150 bg-[#F5F5F7] px-[16px] pt-[8px]"
    >
      <div className="flex items-center">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-label={item.label}
            aria-current={item.label === "채팅" ? "page" : undefined}
            className="relative flex h-[40px] w-[104px] items-center justify-center gap-[10px]"
          >
            {item.icon}

            {item.label === "채팅" && chatNotificationLabel !== undefined ? (
              <CountBadge
                label={chatNotificationLabel}
                className="absolute top-[4px] left-[52px] z-10"
              />
            ) : null}
          </button>
        ))}
      </div>

      <div className="hidden h-[34px] w-full items-center justify-center pt-[21px] pb-[8px] md:flex">
        <div className="h-[5px] w-[134px] rounded-[100px] bg-chat-home-indicator" />
      </div>
    </nav>
  );
}
