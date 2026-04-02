import PageHeader from "@/components/common/PageHeader";
import SearchIcon from "@/assets/pageheader_search.svg?react";
import SettingIcon from "@/assets/pageheader_setting.svg?react";
import AddUserIcon from "@/assets/pageheader_adduser.svg?react";

export default function Friends() {
  return (
    <div>
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
    </div>
  );
}
