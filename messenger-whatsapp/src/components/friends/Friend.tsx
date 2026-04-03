import Profile from "@/assets/profile_default.svg?react";

interface FriendProps {
  name: string;
  statusMessage?: string;
}

export default function Friend({ name, statusMessage }: FriendProps) {
  return (
    <div className="flex flex-row items-center gap-4 py-2.5 px-4">
      <Profile className="w-11 h-11" />
      <div className="flex flex-col">
        <div className="text-body-01 text-gray-06">{name}</div>
        {statusMessage && (
          <div className="text-caption-1 text-gray-04">{statusMessage}</div>
        )}
      </div>
    </div>
  );
}
