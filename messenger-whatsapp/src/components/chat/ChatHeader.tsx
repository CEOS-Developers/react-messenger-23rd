import BackIcon from "../../assets/left.svg?react";
import CameraIcon from "../../assets/camera.svg?react";
import CallICon from "../../assets/call.svg?react";

interface ChatHeaderProps {
  chatName: string;
}

const ChatHeader = ({ chatName }: ChatHeaderProps) => {
  return (
    <div className="flex justify-between px-4 py-2.5">
      <div className="flex flex-row items-center gap-3 typo-headline-2">
        <BackIcon className="cursor-pointer" />
        <p className="cursor-pointer"> {chatName}</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <CameraIcon />
        <CallICon />
      </div>
    </div>
  );
};

export default ChatHeader;
