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
      <div className="flex items-center gap-[2px] rounded-[100px] bg-chat-white/60 px-[16px] pt-[4px] pb-[6px]">
        <span className="typo-caption-02 text-chat-gray-500">
          {inviter}
        </span>
        <span className="typo-caption-01 text-chat-gray-500">
          님이 {users} 채팅방에 초대했습니다.
        </span>
      </div>
    </div>
  );
}
