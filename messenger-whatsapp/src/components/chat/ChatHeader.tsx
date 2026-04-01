import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/left.svg?react";
import CameraIcon from "@/assets/camera.svg?react";
import CallIcon from "@/assets/call.svg?react";
import { useChatStore } from "@/store/useChatStore";

interface ChatHeaderProps {
  chatName: string;
  profileImage?: string;
  chatRoomId: number;
}

const ChatHeader = ({ chatName, chatRoomId }: ChatHeaderProps) => {
  const navigate = useNavigate();
  const swapPerspective = useChatStore((s) => s.swapPerspective);

  return (
    <div className="flex justify-between px-4 py-2.5">
      <div className="flex flex-row items-center gap-3 text-gray-06 font-semibold text-headline-2">
        <BackIcon className="cursor-pointer" onClick={() => navigate("/")} />
        <p
          className="cursor-pointer"
          onClick={() => swapPerspective(chatRoomId)}
        >
          {chatName}
        </p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <CameraIcon />
        <CallIcon />
      </div>
    </div>
  );
};

export default ChatHeader;
