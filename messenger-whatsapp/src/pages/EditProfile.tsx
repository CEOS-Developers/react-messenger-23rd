import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { HeaderConfig } from "@/components/Layouts/MainLayout";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileField from "@/components/profile/ProfileField";
import { useFriendsStore } from "@/store/useFriendsStore";

const MY_ID = 1;

export default function EditProfile() {
  const { setHeaderConfig } = useOutletContext<{
    setHeaderConfig: (c: HeaderConfig) => void;
  }>();

  const navigate = useNavigate();
  const { friends, updateFriend } = useFriendsStore();
  const me = friends.find((f) => f.id === MY_ID);

  const [name, setName] = useState(me?.name ?? "");
  const [phone, setPhone] = useState(me?.phone ?? "");
  const [statusMessage, setStatusMessage] = useState(me?.statusMessage ?? "");
  const [profileImage, setProfileImage] = useState(me?.profileImage ?? "");
  const [linkValues, setLinkValues] = useState(
    me?.links?.map((l) => ({ type: l.type, url: l.url })) ?? [],
  );

  useEffect(() => {
    const handleSave = () => {
      updateFriend(MY_ID, {
        name,
        phone,
        statusMessage,
        profileImage,
        links: linkValues,
      });
      navigate(-1);
    };

    setHeaderConfig({
      title: "",
      showBack: true,
      right: (
        <button
          className="text-body-01 text-gray-06 cursor-pointer px-2"
          onClick={handleSave}
        >
          저장
        </button>
      ),
    });
  }, [
    setHeaderConfig,
    name,
    phone,
    statusMessage,
    profileImage,
    linkValues,
    updateFriend,
    navigate,
  ]);

  return (
    <div className="flex flex-col gap-6 pb-10">
      <ProfileCard
        name={name}
        statusMessage={statusMessage}
        profileImage={profileImage || undefined}
        isMe
        isEditing
        onStatusMessageChange={setStatusMessage}
        onPhotoChange={(v) => setProfileImage(v ?? "")}
      />
      <div className="flex flex-col gap-4">
        <ProfileField label="이름" value={name} isEditing onChange={setName} />
        <ProfileField
          label="전화번호"
          value={phone}
          isEditing
          onChange={setPhone}
        />
        {linkValues.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-body-03 text-gray-04 px-4">링크</span>
            {linkValues.map((link, i) => (
              <ProfileField
                key={i}
                value={link.url}
                isEditing
                onChange={(v) =>
                  setLinkValues((prev) =>
                    prev.map((l, idx) => (idx === i ? { ...l, url: v } : l)),
                  )
                }
                placeholder="링크를 입력해주세요"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
