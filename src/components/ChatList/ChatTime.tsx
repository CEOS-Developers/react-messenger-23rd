import CheckIcon from "@/assets/icons/check.svg?react";
import PinIcon from "@/assets/icons/pin.svg?react";
import { cn } from "@/utils/cn";

interface ChatTimeProps {
  time: string;
  isRead: boolean;
  isFixed?: boolean;
}

const ChatTime = ({ time, isRead, isFixed = false }: ChatTimeProps) => {
  return (
    <div className="flex items-center gap-0.5">
      <CheckIcon className={cn("size-4", isRead ? "text-sub" : "text-gray-300")} />
      {isFixed ? (
        <div className="rounded-4 flex items-center gap-0.5 bg-gray-100 px-1">
          <PinIcon className="size-3 text-gray-300" />
          <span className="font-caption-3 text-gray-500">{time}</span>
        </div>
      ) : (
        <span className="font-caption-3 text-gray-500">{time}</span>
      )}
    </div>
  );
};

export default ChatTime;
