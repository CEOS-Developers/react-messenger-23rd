import clsx from "clsx";
import type { Friend } from "@/store/useFriendsStore";
import Avatar from "@/components/common/Avatar";

interface ChatThumbnailProps {
  participants: Friend[];
}

function ThumbnailAvatar({ user, className }: { user?: Friend; className?: string }) {
  return (
    <Avatar src={user?.profileImage} alt={user?.name} className={className} />
  );
}

export default function ChatThumbnail({ participants }: ChatThumbnailProps) {
  const count = participants.length;

  if (count === 1) {
    return <ThumbnailAvatar user={participants[0]} className="w-12 h-12" />;
  }

  if (count === 2) {
    return (
      <div className="relative w-11 h-11 shrink-0">
        <ThumbnailAvatar user={participants[0]} className="absolute top-0 left-0 w-6 h-6" />
        <ThumbnailAvatar user={participants[1]} className="absolute bottom-0 right-0 w-6 h-6" />
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="relative w-11 h-11 shrink-0">
        <ThumbnailAvatar user={participants[0]} className="absolute top-0 left-0 w-5 h-5" />
        <ThumbnailAvatar user={participants[1]} className="absolute top-0 right-0 w-5 h-5" />
        <ThumbnailAvatar user={participants[2]} className="absolute bottom-0 translate-x-2/3 w-5 h-5" />
      </div>
    );
  }

  return (
    <div className="relative w-12 h-12 shrink-0">
      <ThumbnailAvatar user={participants[0]} className="absolute top-0 left-0 w-[22px] h-[22px]" />
      <ThumbnailAvatar user={participants[1]} className="absolute top-0 right-0 w-[22px] h-[22px]" />
      <ThumbnailAvatar user={participants[2]} className="absolute bottom-0 left-0 w-[22px] h-[22px]" />
      <ThumbnailAvatar user={participants[3]} className="absolute bottom-0 right-0 w-[22px] h-[22px]" />
    </div>
  );
}
