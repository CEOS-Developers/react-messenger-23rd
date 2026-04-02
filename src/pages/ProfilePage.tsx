import { useState } from "react";

import QrIcon from "@/assets/icons/qr.svg?react";
import PostedImage1 from "@/assets/images/PostedImage1.jpg";
import PostedImage2 from "@/assets/images/PostedImage2.jpg";
import PostedImage3 from "@/assets/images/PostedImage3.jpg";
import PostedImage4 from "@/assets/images/PostedImage4.jpg";
import PostedImage5 from "@/assets/images/PostedImage5.jpg";
import PostedImage6 from "@/assets/images/PostedImage6.jpg";
import PostedImage7 from "@/assets/images/PostedImage7.jpg";
import SavedImage1 from "@/assets/images/SavedImage1.jpg";
import SavedImage2 from "@/assets/images/SavedImage2.jpg";
import SavedImage3 from "@/assets/images/SavedImage3.jpg";
import SavedImage4 from "@/assets/images/SavedImage4.jpg";
import Header from "@/components/Common/Header";
import Profile from "@/components/Common/Profile";
import EditButton from "@/components/Profile/EditButton";
import PhotoCard from "@/components/Profile/PhotoCard";
import ToggleTap, { type ToggleTapType } from "@/components/Profile/ToggleTap";
import UploadButton from "@/components/Profile/UploadButton";
import usersData from "@/data/users.json";

const me = usersData.users.find(u => u.userId === 1)!;

const postedImages = [
  PostedImage1,
  PostedImage2,
  PostedImage3,
  PostedImage4,
  PostedImage5,
  PostedImage6,
  PostedImage7,
];
const savedImages = [SavedImage1, SavedImage2, SavedImage3, SavedImage4];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ToggleTapType>("posts");

  return (
    <div className="relative flex h-full flex-col">
      <main className="flex-1 overflow-y-auto">
        <Header leftIcon={<QrIcon />} />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-4">
              <Profile name={me.name} profileColor={me.profileColor} type="profile_big" />
              <div className="text-center">
                <p className="font-heading-2 text-black">{me.name}</p>
                <p className="font-body-5 text-gray-500">+82 10-1234-5678</p>
              </div>
            </div>
            <div className="flex gap-2">
              <EditButton type="profile" />
              <EditButton type="info" />
            </div>
          </div>
          <hr className="w-83.75 text-gray-100" />
          <div className="flex justify-center">
            <ToggleTap active={activeTab} onToggle={setActiveTab} />
          </div>
          <div className="mb-28 grid grid-cols-3 gap-1.5 px-3">
            {activeTab === "posts"
              ? postedImages.map((src, i) => <PhotoCard key={i} src={src} showStar={i === 0} />)
              : savedImages.map((src, i) => <PhotoCard key={i} src={src} />)}
          </div>
        </div>
      </main>
      <div className="absolute bottom-27.5 flex w-full justify-center">
        <UploadButton />
      </div>
    </div>
  );
};

export default ProfilePage;
