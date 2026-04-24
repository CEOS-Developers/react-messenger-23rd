import { memo } from "react";

import Profile from "@/components/Common/Profile";
import { PROFILE_POSITIONS as pos } from "@/constants/profile";

interface ProfileData {
  name: string;
  profileColor: string;
}

interface ProfileImageProps {
  profiles: ProfileData[];
}

function ProfileImage({ profiles }: ProfileImageProps) {
  const count = profiles.length;
  const p = (i: number) => profiles[i];

  if (count === 1) return <Profile {...p(0)} type="chatlist_1" />;

  if (count === 2) {
    return (
      <div className="relative size-11">
        <div className={pos.topLeft}>
          <Profile {...p(0)} type="chatlist_2" />
        </div>
        <div className={pos.bottomRight}>
          <Profile {...p(1)} type="chatlist_2" />
        </div>
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="relative h-10.25 w-11">
        <div className={pos.topCenter}>
          <Profile {...p(0)} type="chatlist_3" />
        </div>
        <div className={pos.bottomLeft}>
          <Profile {...p(1)} type="chatlist_3" />
        </div>
        <div className={pos.bottomRight}>
          <Profile {...p(2)} type="chatlist_3" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative size-11">
      <div className={pos.topLeft}>
        <Profile {...p(0)} type="chatlist_3" />
      </div>
      <div className={pos.topRight}>
        <Profile {...p(1)} type="chatlist_3" />
      </div>
      <div className={pos.bottomLeft}>
        <Profile {...p(2)} type="chatlist_3" />
      </div>
      <div className={pos.bottomRight}>
        <Profile {...p(3)} type="chatlist_3" />
      </div>
    </div>
  );
}

export default memo(ProfileImage);
