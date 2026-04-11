import type { Message } from "@/features/chat/types/chat";

type SystemMessageProps = {
  message: Message;
};

function BoldName({ children }: { children: string }) {
  return (
    <span className="font-kakao-small text-[12px] leading-[160%] font-bold tracking-[0] text-chat-gray-500">
      {children}
    </span>
  );
}

function RegularText({ children }: { children: string }) {
  return (
    <span className="font-kakao-small text-[12px] leading-[160%] font-normal tracking-[0] text-chat-gray-500">
      {children}
    </span>
  );
}

function renderSystemText(message: Message) {
  if (message.systemType === "invite") {
    const invitedNames = message.invitedNames
      ?.map((name) => name.trim())
      .join(", ") ?? "";

    return (
      <>
        <BoldName>{message.actorName ?? ""}</BoldName>
        <RegularText>님이 </RegularText>
        <BoldName>{invitedNames}</BoldName>
        <RegularText> 님을 채팅방에 초대했습니다.</RegularText>
      </>
    );
  }

  return (
    <>
      <BoldName>{message.actorName ?? ""}</BoldName>
      <RegularText>님이 채팅방을 나갔습니다.</RegularText>
    </>
  );
}

export default function SystemMessage({ message }: SystemMessageProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center py-[8px]">
      <div className="flex items-center gap-[2px] rounded-[100px] bg-chat-white/60 px-[16px] pt-[4px] pb-[6px]">
        {renderSystemText(message)}
      </div>
    </div>
  );
}
