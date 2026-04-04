import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import type { HeaderConfig } from "@/components/Layouts/MainLayout";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileField from "@/components/profile/ProfileField";
import { useFriendsStore } from "@/store/useFriendsStore";

export default function FriendProfile() {
  const { setHeaderConfig } = useOutletContext<{
    setHeaderConfig: (c: HeaderConfig) => void;
  }>();

  const { userId } = useParams();
  const allFriends = useFriendsStore((s) => s.friends);
  const friend = allFriends.find((u) => u.id === Number(userId));

  useEffect(() => {
    setHeaderConfig({ title: "", showBack: true });
  }, [setHeaderConfig]);

  return (
    <div className="flex flex-col gap-6 pb-10">
      <ProfileCard
        name={friend?.name ?? ""}
        statusMessage={friend?.statusMessage}
      />
      <div className="flex flex-col gap-4">
        <ProfileField label="이름" value={friend?.name ?? ""} />
        <ProfileField label="전화번호" value={friend?.phone ?? ""} />

        <div className="flex flex-col gap-2">
          {friend?.links && friend.links.length > 0 ? (
            friend.links.map((link, i) => (
              <ProfileField key={i} value={link.url} href={link.url} />
            ))
          ) : (
            <ProfileField label="링크" value="" />
          )}
        </div>
      </div>
    </div>
  );
}
