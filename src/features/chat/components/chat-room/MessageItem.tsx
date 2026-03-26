import type { ReactNode } from "react";
import type { User } from "../../types/chat";

type MessageItemProps = {
  sender: User;
  children: ReactNode;
};

export default function MessageItem({ sender, children }: MessageItemProps) {
  return (
    <div className="flex w-full items-start gap-[8px] pl-[8px] pr-[8px]">
      <img
        src={sender.profileImage}
        alt={`${sender.name} 프로필`}
        className="h-[32px] w-[32px] shrink-0"
      />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-[4px]">
        <span
          className="overflow-hidden text-[12px] font-bold text-[#363638]"
          style={{
            fontFamily:
              '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
            fontFeatureSettings: '"liga" off, "clig" off',
            lineHeight: "160%",
            letterSpacing: "-0.48px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            textOverflow: "ellipsis",
          }}
        >
          {sender.name}
        </span>

        <div className="flex flex-col items-start gap-[4px]">{children}</div>
      </div>
    </div>
  );
}