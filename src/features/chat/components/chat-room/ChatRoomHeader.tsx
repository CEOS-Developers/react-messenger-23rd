import ChevronLeftIcon from "../../../../assets/icons/chat/ic_Chevron_Left.svg";
import SearchIcon from "../../../../assets/icons/chat/ic_Search.svg";
import MenuIcon from "../../../../assets/icons/chat/ic_Menu.svg";

type ChatRoomHeaderProps = {
  title: string;
  participantCount?: number;
};

export default function ChatRoomHeader({
  title,
  participantCount,
}: ChatRoomHeaderProps) {
  return (
    <header
      className="relative flex h-[40px] w-full items-center justify-between px-[8px] py-[4px]"
      style={{
        background: "rgba(167, 200, 232, 0.80)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      <button
        type="button"
        aria-label="뒤로가기"
        className="flex h-[40px] w-[40px] shrink-0 items-center justify-center"
      >
        <div className="flex h-[40px] w-[40px] items-center justify-center p-[4px]">
          <img src={ChevronLeftIcon} alt="" className="h-[32px] w-[32px]" />
        </div>
      </button>

      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[4px]">
        <h1
          className="text-center text-[16px] font-bold text-[#191919]"
          style={{
            fontFamily:
              '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
            fontFeatureSettings: '"liga" off, "clig" off',
            lineHeight: "160%",
            letterSpacing: "-0.64px",
          }}
        >
          {title}
        </h1>

        {participantCount !== undefined ? (
          <span
            className="text-center text-[16px] font-bold text-[#79797B]"
            style={{
              fontFamily:
                '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
              fontFeatureSettings: '"liga" off, "clig" off',
              lineHeight: "160%",
              letterSpacing: "-0.64px",
            }}
          >
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
            <img src={SearchIcon} alt="" className="h-[24px] w-[24px]" />
          </div>
        </button>

        <button
          type="button"
          aria-label="메뉴"
          className="flex h-[40px] w-[40px] items-center justify-center"
        >
          <div className="flex h-[40px] w-[40px] items-center justify-center p-[8px]">
            <img src={MenuIcon} alt="" className="h-[24px] w-[24px]" />
          </div>
        </button>
      </div>
    </header>
  );
}