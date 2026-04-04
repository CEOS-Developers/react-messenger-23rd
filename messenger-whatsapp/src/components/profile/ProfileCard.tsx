import EditingProfile from "@/assets/profile_reverse.svg?react";
import DefaultProfile from "@/assets/profile_default.svg?react";
import Tail from "@/assets/profile_statusmessage_tail.svg?react";
import EditTail from "@/assets/profile_statusmessage_tail_edit.svg?react";

interface ProfileCardProps {
  name: string;
  statusMessage?: string;
  isMe?: boolean;
  isEditing?: boolean;
  onStatusMessageChange?: (value: string) => void;
}

export default function ProfileCard({
  name,
  statusMessage,
  isMe = false,
  isEditing,
  onStatusMessageChange,
}: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center mb-8 mt-1">
      <div className="relative">
        {isEditing ? (
          <input
            className={`relative z-10 flex items-center justify-center text-body-01 text-gray-06 text-center py-4 w-49 rounded-[52px] outline-none bg-main-bg`}
            value={statusMessage ?? ""}
            onChange={(e) => onStatusMessageChange?.(e.target.value)}
            placeholder="상태를 입력해주세요"
          />
        ) : (
          <span className="relative z-10 flex items-center justify-center text-body-01 text-gray-06 py-4 w-49 rounded-[52px] bg-gray-01">
            {statusMessage ? "" + statusMessage : "상태 메시지가 없습니다"}
          </span>
        )}
        {isEditing ? (
          <EditTail className="w-8 absolute left-12 -bottom-5.5 z-0" />
        ) : (
          <Tail className="w-8 absolute left-12 -bottom-5.5 z-0" />
        )}
      </div>

      {isMe && !isEditing ? (
        <EditingProfile className="w-33 h-33 mt-1" />
      ) : (
        <DefaultProfile className="w-33 h-33 mt-1" />
      )}
      <div className="flex flex-col items-center gap-1 mt-4">
        <span className="text-headline-1 text-gray-06 font-semibold">
          {name}
        </span>
      </div>
    </div>
  );
}
