import CheckIcon from "@/assets/icons/check.svg?react";

interface ChatReadProps {
  type: "my" | "friend";
  isRead: boolean;
  time: string;
}

const ChatRead = ({ type, isRead, time }: ChatReadProps) => {
  const isMy = type === "my";
  const isReadColor = isRead ? "text-sub" : "text-gray-400";

  return (
    <div className={`flex w-13 flex-col justify-center ${isMy ? "items-end" : "items-start"}`}>
      <CheckIcon className={`size-4 ${isReadColor}`} />
      <span className={`font-caption-3 w-full text-gray-400 ${isMy ? "text-right" : "text-left"}`}>
        {time}
      </span>
    </div>
  );
};

export default ChatRead;
