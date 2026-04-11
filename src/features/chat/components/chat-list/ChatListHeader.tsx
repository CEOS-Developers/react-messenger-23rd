import CountBadge from "@/features/chat/components/chat-list/CountBadge";
import SearchIconSvg from "@/assets/icons/ic_Search.svg";
import ChatPlusIconSvg from "@/assets/icons/ic_ChatPlus.svg";
import SettingIconSvg from "@/assets/icons/ic_Setting.svg";

const HEADER_ACTIONS = [
  {
    label: "검색",
    icon: SearchIconSvg,
  },
  {
    label: "채팅방 만들기",
    icon: ChatPlusIconSvg,
  },
  {
    label: "설정",
    icon: SettingIconSvg,
  },
];

type ChatListFilter = "all" | "unread";

type ChatListHeaderProps = {
  activeFilter: ChatListFilter;
  unreadCountLabel: string;
  onFilterChange: (filter: ChatListFilter) => void;
};

export default function ChatListHeader({
  activeFilter,
  unreadCountLabel,
  onFilterChange,
}: ChatListHeaderProps) {
  const isAllActive = activeFilter === "all";
  const isUnreadActive = activeFilter === "unread";

  return (
    <header className="flex flex-col items-start gap-[12px] self-stretch bg-chat-white px-[16px] pt-[16px] pb-[20px]">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-kakao-big text-[20px] leading-[140%] font-bold tracking-[0] text-black">
          채팅
        </h1>

        <div className="flex items-center gap-[4px]">
          {HEADER_ACTIONS.map((action) => (
            <button
              key={action.label}
              type="button"
              aria-label={action.label}
              className="flex h-[40px] w-[40px] items-center justify-center gap-[10px] p-[8px]"
            >
              <img
                src={action.icon}
                alt=""
                className="svg-icon h-[24px] w-[24px]"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-[8px]">
        <button
          type="button"
          aria-pressed={isAllActive}
          onClick={() => onFilterChange("all")}
          className={`flex items-center justify-center gap-[10px] rounded-[100px] px-[12px] py-[6px] ${
            isAllActive ? "bg-chat-black" : "border border-chat-gray-200"
          }`}
        >
          <span
            className={`font-kakao-small text-[14px] leading-[160%] font-bold tracking-[0] ${
              isAllActive ? "text-chat-white" : "text-black"
            }`}
          >
            전체
          </span>
        </button>

        <button
          type="button"
          aria-pressed={isUnreadActive}
          onClick={() => onFilterChange("unread")}
          className={`flex items-center justify-center gap-[4px] rounded-[100px] px-[12px] py-[6px] ${
            isUnreadActive ? "bg-chat-black" : "border border-chat-gray-200"
          }`}
        >
          <span
            className={`font-kakao-small text-[14px] leading-[160%] font-bold tracking-[0] ${
              isUnreadActive ? "text-chat-white" : "text-black"
            }`}
          >
            안읽음
          </span>
          <CountBadge label={unreadCountLabel} />
        </button>
      </div>
    </header>
  );
}
