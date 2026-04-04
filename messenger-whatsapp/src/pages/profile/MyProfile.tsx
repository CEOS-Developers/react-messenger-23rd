import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { HeaderConfig } from "@/components/Layouts/MainLayout";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileField from "@/components/profile/ProfileField";
import { useFriendsStore } from "@/store/useFriendsStore";

const MY_ID = 1;

export default function MyProfile() {
  const { setHeaderConfig } = useOutletContext<{
    setHeaderConfig: (c: HeaderConfig) => void;
  }>();

  const { friends, updateFriend } = useFriendsStore();
  const me = friends.find((f) => f.id === MY_ID);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(me?.name ?? "");
  const [phone, setPhone] = useState(me?.phone ?? "");
  const [statusMessage, setStatusMessage] = useState(me?.statusMessage ?? "");
  const [linkValues, setLinkValues] = useState(
    me?.links?.map((l) => ({ type: l.type, url: l.url })) ?? [],
  );

  const handleToggleEdit = () => {
    if (isEditing) {
      updateFriend(MY_ID, { name, phone, statusMessage, links: linkValues });
    }
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    setHeaderConfig({
      title: "",
      showBack: true,
      right: (
        <button
          className="text-body-01 text-gray-06 cursor-pointer px-2"
          onClick={handleToggleEdit}
        >
          {isEditing ? "저장" : "수정"}
        </button>
      ),
    });
  }, [setHeaderConfig, isEditing]);

  return (
    <div className="flex flex-col gap-6 pb-10">
      <ProfileCard
        name={me?.name ?? ""}
        statusMessage={statusMessage}
        isMe
        isEditing={isEditing}
        onStatusMessageChange={setStatusMessage}
      />
      <div className="flex flex-col gap-4">
        <ProfileField
          label="이름"
          value={name}
          isEditing={isEditing}
          onChange={setName}
        />
        <ProfileField
          label="전화번호"
          value={phone}
          isEditing={isEditing}
          onChange={setPhone}
        />
        {linkValues.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-body-03 text-gray-04 px-4">링크</span>
            {linkValues.map((link, i) => (
              <ProfileField
                key={i}
                value={link.url}
                isEditing={isEditing}
                onChange={(v) =>
                  setLinkValues((prev) =>
                    prev.map((l, idx) => (idx === i ? { ...l, url: v } : l)),
                  )
                }
                href={link.url}
                placeholder="링크를 입력해주세요"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
