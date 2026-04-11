type InviteSystemMessageProps = {
  inviter: string;
  users: string;
};

export default function InviteSystemMessage({
  inviter,
  users,
}: InviteSystemMessageProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center py-[8px]">
      <div className="flex items-center gap-[2px] rounded-[100px] bg-[rgba(255,255,255,0.60)] px-[16px] pt-[4px] pb-[6px]">
        <span
          className="text-[12px] font-bold text-[#525254]"
          style={{
            fontFamily:
              '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
            fontFeatureSettings: '"liga" off, "clig" off',
            lineHeight: "160%",
            letterSpacing: "-0.48px",
          }}
        >
          {inviter}
        </span>
        <span
          className="text-[12px] font-normal text-[#525254]"
          style={{
            fontFamily:
              '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
            fontFeatureSettings: '"liga" off, "clig" off',
            lineHeight: "160%",
            letterSpacing: "-0.48px",
          }}
        >
          님이 {users} 채팅방에 초대했습니다.
        </span>
      </div>
    </div>
  );
}