import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import Avatar from "@/components/common/Avatar";

interface FriendProps {
  id: number;
  name: string;
  isMe?: boolean;
  profileImage?: string;
}

export default function Friend({ id, name, isMe = false, profileImage }: FriendProps) {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "flex flex-row items-center gap-4 py-2.5 cursor-pointer",
        isMe ? "px-5 border-b border-gray-03" : "px-4",
      )}
      onClick={() => navigate(isMe ? "/profile" : `/profile/${id}`)}
    >
      <Avatar
        src={profileImage}
        variant={isMe ? "me" : "default"}
        className={isMe ? "w-12 h-12" : "w-11 h-11"}
      />
      <div className="flex flex-col">
        <div className={clsx("text-gray-06", isMe ? "text-headline-2" : "text-body-01")}>
          {name}
        </div>
      </div>
    </div>
  );
}
