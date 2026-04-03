import PageHeader from "@/components/common/PageHeader";
import SearchIcon from "@/assets/pageheader_search.svg?react";
import SettingIcon from "@/assets/pageheader_setting.svg?react";
import AddUserIcon from "@/assets/pageheader_adduser.svg?react";
import FriendMe from "@/components/friends/FriendMe";
import FriendsList from "@/components/friends/FriendsList";
import mockFriends from "@/data/mockFriends.json";

export default function Friends() {
  return (
    <div>
      <header>
        <PageHeader
          title="친구"
          right={
            <>
              <SearchIcon />
              <SettingIcon />
              <AddUserIcon />
            </>
          }
        />
      </header>
      <main>
        <FriendMe />
        <div className="p-4 text-caption-1 text-gray-04">
          친구 {mockFriends.length}
        </div>
        <FriendsList />
      </main>
    </div>
  );
}
