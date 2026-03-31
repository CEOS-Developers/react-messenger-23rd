import type { Message } from "../../types/chat";

interface Props {
  message: Message;
}

export default function ReceivedBubble({ message }: Props) {
  return (
    <main className="flex gap-1 my-2">
      {/* 프로필 */}
      <div>
        <img
          src="/images/profiles/kimjiwon.png"
          className="w-11 h-11 shrink-0"
          alt="profileImage"
        />
        {/* 우선 상대방 김지원으로 고정 */}
      </div>
      {/* 대화 내용 */}
      <div
        className="relative bg-gray80 text-white px-4 py-3 rounded-lg gap-2.5 ml-2 max-w-[70%] font-body-02
      after:content-[''] after:absolute
      after:top-1/2 after:-translate-y-1/2 after:-left-3
      after:border-t-[6px] after:border-b-[6px] after:border-l-[6px] after:border-r-[6px]
      after:border-r-gray80
      after:border-b-transparent after:border-t-transparent after:border-l-transparent"
      >
        {message.text}
      </div>
    </main>
  );
}
