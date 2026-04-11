import type { ReactNode } from "react";
import ProfileImageSvg from "@/assets/icons/ProfileImage.svg";
import ProfileImageOnePng from "@/assets/images/ProfileImage_1.png";
import ProfileImageTwoPng from "@/assets/images/ProfileImage_2.png";
import type { User } from "@/features/chat/types/chat";

type MessageItemProps = {
  sender: User;
  children: ReactNode;
};

const profileImageMap: Record<string, string> = {
  "ProfileImage.svg": ProfileImageSvg,
  "ProfileImage_1.png": ProfileImageOnePng,
  "ProfileImage_2.png": ProfileImageTwoPng,
};

export default function MessageItem({ sender, children }: MessageItemProps) {
  const resolvedProfileImage =
    profileImageMap[sender.profileImage] ?? ProfileImageSvg;

  return (
    <div className="flex w-full items-start gap-[8px] pl-[8px] pr-[8px]">
      <img
        src={resolvedProfileImage}
        alt={`${sender.name} 프로필 이미지`}
        className="svg-icon h-[32px] w-[32px]"
      />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-[4px]">
        <span className="typo-caption-02 line-clamp-1 overflow-hidden text-chat-gray-600">
          {sender.name}
        </span>

        <div className="flex flex-col items-start gap-[4px]">{children}</div>
      </div>
    </div>
  );
}
