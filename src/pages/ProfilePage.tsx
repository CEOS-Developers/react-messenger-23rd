import QrIcon from "@/assets/icons/qr.svg?react";
import Header from "@/components/Common/Header";
import Profile from "@/components/Common/Profile";
import ToggleTap from "@/components/Profile/ToggleTap";
import UploadButton from "@/components/Profile/UploadButton";
import usersData from "@/data/users.json";

const me = usersData.users.find(u => u.userId === 1)!;

const ProfilePage = () => {
  return (
    <div className="h-full overflow-y-auto">
      <Header leftIcon={<QrIcon />} />
      <main>
        <Profile name={me.name} profileColor={me.profileColor} type="profile_big" />
        <ToggleTap />
        <UploadButton />
      </main>
    </div>
  );
};

export default ProfilePage;
