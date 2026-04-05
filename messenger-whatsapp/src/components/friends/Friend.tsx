import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import MeProfile from "@/assets/profile_reverse.svg?react";
import DefaultProfile from "@/assets/profile_default.svg?react";

interface FriendProps {
  id: number;
  name: string;
  isMe?: boolean;
  profileImage?: string;
}

export default function Friend({ id, name, isMe = false, profileImage }: FriendProps) {
  const navigate = useNavigate();

  const renderAvatar = () => {
    if (profileImage) {
      return (
        <img
          src={profileImage}
          alt="profile"
          className={clsx("rounded-full object-cover", isMe ? "w-12 h-12" : "w-11 h-11")}
        />
      );
    }
    return isMe ? <MeProfile className="w-12 h-12" /> : <DefaultProfile className="w-11 h-11" />;
  };

  return (
    <div
      className={clsx(
        "flex flex-row items-center gap-4 py-2.5 cursor-pointer",
        isMe ? "px-5 border-b border-gray-03" : "px-4",
      )}
      onClick={() => navigate(isMe ? "/profile" : `/profile/${id}`)}
    >
      {renderAvatar()}
      <div className="flex flex-col">
        <div className={clsx("text-gray-06", isMe ? "text-headline-2" : "text-body-01")}>
          {name}
        </div>
      </div>
    </div>
  );
}
