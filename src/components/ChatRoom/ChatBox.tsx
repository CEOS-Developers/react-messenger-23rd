import { cn } from "@/utils/cn";

interface ChatBoxProps {
  type: "my" | "friend";
  message: string;
  imageUrl?: string;
  isFirst?: boolean;
}

const ChatBox = ({ type, message, imageUrl, isFirst = false }: ChatBoxProps) => {
  const isMy = type === "my";
  const cornerClass = !isFirst
    ? "rounded-12"
    : isMy
      ? "rounded-12 rounded-tr-2"
      : "rounded-12 rounded-tl-2";

  if (imageUrl) {
    return (
      <div className={cn("w-fit max-w-61.25 overflow-hidden", cornerClass)}>
        <img
          src={imageUrl}
          alt="사진"
          className={cn("block max-w-full object-cover", cornerClass)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "font-body-6 w-fit max-w-61.25 px-3 py-2.5 wrap-break-word",
        cornerClass,
        isMy ? "bg-primary-300 text-white" : "bg-gray-100 text-black",
      )}
    >
      {message}
    </div>
  );
};

export default ChatBox;
