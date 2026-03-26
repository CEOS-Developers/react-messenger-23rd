import backIcon from "@/assets/icons/back.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import videoIcon from "@/assets/icons/video.svg";
import menuIcon from "@/assets/icons/menu-room.svg";

interface ChatHeaderProps {
  name: string;
  onBack: () => void;
  onProfileClick: () => void;
}

export default function ChatHeader({
  name,
  onBack,
  onProfileClick,
}: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-3 py-3 h-12 bg-surface-chat border-b border-line">
      <div className="flex items-center gap-2">
        <button onClick={onBack} type="button" className="cursor-pointer">
          <img src={backIcon} alt="뒤로" className="w-6 h-6" />
        </button>
        <button
          onClick={onProfileClick}
          type="button"
          className="text-[20px] font-semibold leading-[100%] text-content-primary cursor-pointer truncate max-w-47"
        >
          {name}
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" aria-label="전화" className="cursor-pointer">
          <img src={phoneIcon} alt="" aria-hidden="true" className="w-6 h-6" />
        </button>
        <button type="button" aria-label="영상통화" className="cursor-pointer">
          <img src={videoIcon} alt="" aria-hidden="true" className="w-6 h-6" />
        </button>
        <button type="button" aria-label="메뉴" className="cursor-pointer">
          <img src={menuIcon} alt="" aria-hidden="true" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
