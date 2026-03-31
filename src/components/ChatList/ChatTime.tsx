import { memo } from "react";

import CheckIcon from "@/assets/icons/check.svg?react";
import PinIcon from "@/assets/icons/pin.svg?react";
import { cn } from "@/utils/cn";

interface ChatTimeProps {
  time: string;
  isRead: boolean;
  isFixed?: boolean;
}

function ChatTime({ time, isRead, isFixed = false }: ChatTimeProps) {
  return (
    <div className="flex items-center gap-0.5">
      <CheckIcon className={cn("size-4", isRead ? "text-sub" : "text-gray-300")} />
      <div
        className={cn(
          "font-caption-3 flex items-center gap-0.5 text-gray-500",
          isFixed && "rounded-4 bg-gray-100 px-1",
        )}
      >
        {isFixed && <PinIcon className="size-3 text-gray-300" />}
        <span>{time}</span>
      </div>
    </div>
  );
}

export default memo(ChatTime);
