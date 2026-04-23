import IconBack from "@/assets/icons/icon_back.svg?react";
import IconPhone from "@/assets/icons/icon_phone.svg?react";
import IconVideo from "@/assets/icons/icon_video.svg?react";
import IconMenuRoom from "@/assets/icons/icon_menu_room.svg?react";

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
    <header className="flex items-center justify-between px-3 py-3 h-12 bg-surface-muted border-b border-line">
      <div className="flex items-center gap-2">
        <button onClick={onBack} type="button" className="cursor-pointer">
          <IconBack className="w-6 h-6" aria-label="뒤로" />
        </button>
        <button
          onClick={onProfileClick}
          type="button"
          className="text-h2 text-content-primary cursor-pointer truncate max-w-47"
        >
          {name}
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" aria-label="전화" className="cursor-pointer">
          <IconPhone className="w-6 h-6" aria-hidden="true" />
        </button>
        <button type="button" aria-label="영상통화" className="cursor-pointer">
          <IconVideo className="w-6 h-6" aria-hidden="true" />
        </button>
        <button type="button" aria-label="메뉴" className="cursor-pointer">
          <IconMenuRoom className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
