import BackIcon from "../../assets/left.svg?react";
import CameraIcon from "../../assets/camera.svg?react";
import CallICon from "../../assets/call.svg?react";
import { useChatStore } from "../../store/useChatStore";

interface ChatHeaderProps {
  chatName: string;
  profileImage?: string;
}

const ChatHeader = ({ chatName }: ChatHeaderProps) => {
  const swapPerspective = useChatStore((s) => s.swapPerspective);

  return (
    <div className="flex justify-between px-4 py-2.5">
      <div className="flex flex-row items-center gap-3 typo-headline-2">
        <BackIcon className="cursor-pointer" />
        <p className="cursor-pointer" onClick={swapPerspective}>
          {chatName}
        </p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <CameraIcon />
        <CallICon />
      </div>
    </div>
  );
};

export default ChatHeader;
