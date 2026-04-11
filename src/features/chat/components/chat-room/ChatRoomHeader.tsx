import ChevronLeftIconSvg from "@/assets/icons/ic_Chevron_Left.svg";
import SearchIconSvg from "@/assets/icons/ic_Search.svg";
import MenuIconSvg from "@/assets/icons/ic_Menu.svg";

type ChatRoomHeaderProps = {
  title: string;
  participantCount?: number;
  onBack?: () => void;
};

export default function ChatRoomHeader({
  title,
  participantCount,
  onBack,
}: ChatRoomHeaderProps) {
  return (
    <header className="relative flex h-[40px] w-full items-center justify-between bg-chat-blue-100/80 px-[8px] py-[4px] backdrop-blur-[2px]">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={onBack}
        className="flex h-[40px] w-[40px] shrink-0 items-center justify-center"
      >
        <div className="flex h-[40px] w-[40px] items-center justify-center p-[4px]">
          <img
            src={ChevronLeftIconSvg}
            alt="뒤로가기 아이콘"
            className="svg-icon h-[32px] w-[32px]"
          />
        </div>
      </button>

      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[4px]">
        <h1 className="typo-body-01 text-center text-chat-black">
          {title}
        </h1>

        {participantCount !== undefined ? (
          <span className="typo-body-01 text-center text-chat-gray-400">
            {participantCount}
          </span>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-[4px]">
        <button
          type="button"
          aria-label="검색"
          className="flex h-[40px] w-[40px] items-center justify-center"
        >
          <div className="flex h-[40px] w-[40px] items-center justify-center p-[8px]">
            <img
              src={SearchIconSvg}
              alt="검색 아이콘"
              className="svg-icon h-[24px] w-[24px]"
            />
          </div>
        </button>

        <button
          type="button"
          aria-label="메뉴"
          className="flex h-[40px] w-[40px] items-center justify-center"
        >
          <div className="flex h-[40px] w-[40px] items-center justify-center p-[8px]">
            <img
              src={MenuIconSvg}
              alt="메뉴 아이콘"
              className="svg-icon h-[24px] w-[24px]"
            />
          </div>
        </button>
      </div>
    </header>
  );
}
