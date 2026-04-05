import type { User } from "@/store/useChatStore";

interface ChatThumbnailProps {
  participants: User[];
}

function AvatarCell({
  user,
  className,
}: {
  user?: User;
  className?: string;
}) {
  return (
    <div className={`bg-gray-02 overflow-hidden shrink-0 ${className ?? ""}`}>
      {user?.profileImage && (
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

export default function ChatThumbnail({ participants }: ChatThumbnailProps) {
  const count = participants.length;

  // 1:1
  if (count === 1) {
    return (
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
        <AvatarCell user={participants[0]} className="w-full h-full" />
      </div>
    );
  }

  // 나 제외 2명: 세로 반반
  if (count === 2) {
    return (
      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex flex-row gap-px bg-gray-03">
        <AvatarCell user={participants[0]} className="flex-1 h-full" />
        <AvatarCell user={participants[1]} className="flex-1 h-full" />
      </div>
    );
  }

  // 나 제외 3명: 위 1 + 아래 2
  if (count === 3) {
    return (
      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex flex-col gap-px bg-gray-03">
        <AvatarCell user={participants[0]} className="w-full flex-1" />
        <div className="flex flex-row gap-px flex-1">
          <AvatarCell user={participants[1]} className="flex-1 h-full" />
          <AvatarCell user={participants[2]} className="flex-1 h-full" />
        </div>
      </div>
    );
  }

  // 나 제외 4명 이상: 2x2 그리드
  return (
    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex flex-col gap-px bg-gray-03">
      <div className="flex flex-row gap-px flex-1">
        <AvatarCell user={participants[0]} className="flex-1 h-full" />
        <AvatarCell user={participants[1]} className="flex-1 h-full" />
      </div>
      <div className="flex flex-row gap-px flex-1">
        <AvatarCell user={participants[2]} className="flex-1 h-full" />
        <AvatarCell user={participants[3]} className="flex-1 h-full" />
      </div>
    </div>
  );
}
