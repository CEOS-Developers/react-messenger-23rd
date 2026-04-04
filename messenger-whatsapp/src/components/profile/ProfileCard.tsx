import { useRef, useState } from "react";
import EditingProfile from "@/assets/profile_reverse.svg?react";
import DefaultProfile from "@/assets/profile_default.svg?react";
import Tail from "@/assets/profile_statusmessage_tail.svg?react";
import EditTail from "@/assets/profile_statusmessage_tail_edit.svg?react";

interface ProfileCardProps {
  name: string;
  statusMessage?: string;
  isMe?: boolean;
  isEditing?: boolean;
  profileImage?: string;
  onStatusMessageChange?: (value: string) => void;
  onPhotoChange?: (dataUrl: string | null) => void;
}

export default function ProfileCard({
  name,
  statusMessage,
  isMe = false,
  isEditing,
  profileImage,
  onStatusMessageChange,
  onPhotoChange,
}: ProfileCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onPhotoChange?.(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (!isMe || !isEditing || !profileImage?.startsWith("data:")) return;
    e.preventDefault();
    setShowDeleteMenu(true);
  };

  const renderAvatar = () => {
    if (profileImage?.startsWith("data:")) {
      return (
        <img
          src={profileImage}
          alt="profile"
          className="w-33 h-33 mt-1 rounded-full object-cover"
        />
      );
    }
    if (isMe && !isEditing)
      return <EditingProfile className="w-33 h-33 mt-1" />;
    return <DefaultProfile className="w-33 h-33 mt-1" />;
  };

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

      <div className="relative mt-1">
        <div
          onClick={() => isMe && isEditing && fileInputRef.current?.click()}
          onContextMenu={handleContextMenu}
          className={isMe && isEditing ? "cursor-pointer" : ""}
        >
          {renderAvatar()}
        </div>

        {showDeleteMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDeleteMenu(false)}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                className="px-6 py-3 text-body-01 text-red-500 whitespace-nowrap"
                onClick={() => {
                  onPhotoChange?.(null);
                  setShowDeleteMenu(false);
                }}
              >
                사진 삭제
              </button>
            </div>
          </>
        )}

        {isMe && isEditing && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        )}
      </div>

      <div className="flex flex-col items-center gap-1 mt-4">
        <span className="text-headline-1 text-gray-06 font-semibold">
          {name}
        </span>
      </div>
    </div>
  );
}
