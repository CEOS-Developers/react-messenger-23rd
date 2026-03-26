import CheckIcon from "@/assets/icons/check.svg?react";
import { cn } from "@/utils/cn";

interface ChatReadProps {
  type: "my" | "friend";
  isRead: boolean;
  time: string;
}

const ChatRead = ({ type, isRead, time }: ChatReadProps) => {
  const isMy = type === "my";

  return (
    <div className={cn("flex w-13 flex-col justify-center", isMy ? "items-end" : "items-start")}>
      <CheckIcon className={cn("size-4", isRead ? "text-sub" : "text-gray-400")} />
      <span
        className={cn("font-caption-3 w-full text-gray-400", isMy ? "text-right" : "text-left")}
      >
        {time}
      </span>
    </div>
  );
};

export default ChatRead;
