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
    if (profileImage?.startsWith("data:")) {
      return (
        <img
          src={profileImage}
          alt="profile"
          className={`${isMe ? "w-12 h-12" : "w-11 h-11"} rounded-full object-cover`}
        />
      );
    }
    return isMe ? (
      <MeProfile className="w-12 h-12" />
    ) : (
      <DefaultProfile className="w-11 h-11" />
    );
  };

  return (
    <div
      className={`flex flex-row items-center gap-4 py-2.5 cursor-pointer ${isMe ? "px-5 border-b border-gray-03" : "px-4"}`}
      onClick={() => navigate(isMe ? "/profile" : `/profile/${id}`)}
    >
      {renderAvatar()}
      <div className="flex flex-col">
        <div
          className={`${isMe ? "text-headline-2" : "text-body-01"} text-gray-06`}
        >
          {name}
        </div>
      </div>
    </div>
  );
}
