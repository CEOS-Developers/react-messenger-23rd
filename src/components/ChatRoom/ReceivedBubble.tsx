import type { Message } from "../../types/chat";

interface Props {
  message: Message;
}

export default function ReceivedBubble({ message }: Props) {
  return (
    <main className="flex gap-1 my-2">
      {/* 프로필 */}
      <div>
        <img src="/images/profiles/kimjiwon.png" alt="profileImage" />
        {/* 우선 상대방 김지원으로 고정 */}
      </div>
      {/* 대화 내용 */}
      <div className="bg-gray80 text-white px-2.5 py-4 rounded-xl gap-2.5">
        {message.text}
      </div>
    </main>
  );
}
