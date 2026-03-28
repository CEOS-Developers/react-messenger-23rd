import { cn } from "@/utils/cn";

interface ChatBoxProps {
  type: "my" | "friend";
  message: string;
  isFirst?: boolean;
}

const ChatBox = ({ type, message, isFirst = false }: ChatBoxProps) => {
  const isMy = type === "my";

  return (
    <div
      className={cn(
        "font-body-6 w-fit max-w-61.25 px-3 py-2.5 wrap-break-word",
        !isFirst ? "rounded-12" : isMy ? "rounded-12 rounded-tr-2" : "rounded-12 rounded-tl-2",
        isMy ? "bg-primary-300 text-white" : "bg-gray-100 text-black",
      )}
    >
      {message}
    </div>
  );
};

export default ChatBox;
