import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type { HeaderConfig } from "@/components/Layouts/MainLayout";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileField from "@/components/profile/ProfileField";
import { useFriendsStore } from "@/store/useFriendsStore";
import { MY_ID } from "@/constants/userId";

export default function Profile() {
  const { setHeaderConfig } = useOutletContext<{
    setHeaderConfig: (c: HeaderConfig) => void;
  }>();

  const { userId } = useParams();
  const navigate = useNavigate();

  const id = userId ? Number(userId) : MY_ID;
  const isMe = id === MY_ID;

  const friends = useFriendsStore((s) => s.friends);
  const profile = friends.find((f) => f.id === id);

  useEffect(() => {
    setHeaderConfig({
      title: "",
      showBack: true,
      right: isMe ? (
        <button
          className="text-body-01 text-gray-06 cursor-pointer px-2"
          onClick={() => navigate("/profile/edit")}
        >
          수정
        </button>
      ) : undefined,
    });
  }, [setHeaderConfig, isMe, navigate]);

  return (
    <div className="flex flex-col gap-6 pb-10">
      <ProfileCard
        name={profile?.name ?? ""}
        statusMessage={profile?.statusMessage}
        profileImage={profile?.profileImage || undefined}
        isMe={isMe}
      />
      <div className="flex flex-col gap-4">
        {profile?.name && <ProfileField label="이름" value={profile.name} />}
        {profile?.phone && (
          <ProfileField label="전화번호" value={profile.phone} />
        )}
        {profile?.links && profile.links.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-body-03 text-gray-04 px-4">링크</span>
            {profile.links.map((link, i) => (
              <ProfileField key={i} value={link.url} href={link.url} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
