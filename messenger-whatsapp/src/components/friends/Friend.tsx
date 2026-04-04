import { useNavigate } from "react-router-dom";
import MeProfile from "@/assets/profile_reverse.svg?react";
import DefaultProfile from "@/assets/profile_default.svg?react";

interface FriendProps {
  id: number;
  name: string;
  statusMessage?: string;
  isMe?: boolean;
}

export default function Friend({ id, name, statusMessage, isMe = false }: FriendProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-row items-center gap-4 py-2.5 cursor-pointer ${isMe ? "px-5 border-b border-gray-03" : "px-4"}`}
      onClick={() => navigate(isMe ? "/profile" : `/profile/${id}`)}
    >
      {isMe ? (
        <MeProfile className="w-12 h-12" />
      ) : (
        <DefaultProfile className="w-11 h-11" />
      )}
      <div className="flex flex-col">
        <div className={`${isMe ? "text-headline-2" : "text-body-01"} text-gray-06`}>
          {name}
        </div>
        {!isMe && statusMessage && (
          <div className="text-caption-1 text-gray-04">{statusMessage}</div>
        )}
      </div>
    </div>
  );
}
