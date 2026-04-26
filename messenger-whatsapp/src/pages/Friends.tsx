import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { HeaderConfig } from "@/components/Layouts/MainLayout";
import SearchIcon from "@/assets/pageheader_search.svg?react";
import SettingIcon from "@/assets/pageheader_setting.svg?react";
import AddUserIcon from "@/assets/pageheader_adduser.svg?react";
import Friend from "@/components/friends/Friend";
import FriendsList from "@/components/friends/FriendsList";
import { useFriendsStore } from "@/store/useFriendsStore";
import { MY_ID } from "@/constants/userId";

export default function Friends() {
  const { setHeaderConfig } = useOutletContext<{
    setHeaderConfig: (c: HeaderConfig) => void;
  }>();
  const friends = useFriendsStore((s) => s.friends);
  const me = friends.find((f) => f.id === MY_ID);
  const friendCount = friends.length - 1;

  useEffect(() => {
    setHeaderConfig({
      title: "친구",
      right: (
        <>
          <SearchIcon />
          <SettingIcon />
          <AddUserIcon />
        </>
      ),
    });
  }, [setHeaderConfig]);

  return (
    <div>
      <Friend
        id={MY_ID}
        name={me?.name ?? ""}
        isMe
        profileImage={me?.profileImage || undefined}
      />
      <div className="p-4 text-caption-1 text-gray-04">친구 {friendCount}</div>
      <FriendsList />
    </div>
  );
}
