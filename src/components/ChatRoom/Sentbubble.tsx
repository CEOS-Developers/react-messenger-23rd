import type { Message } from "../../types/chat";

interface Props {
  message: Message;
}

export default function SentBubble({ message }: Props) {
  return (
    <main className="flex justify-end items-end gap-1 my-2">
      {/* 대화 내용 */}
      <div className="bg-main2 text-black px-2.5 py-4 rounded-xl gap-2.5">
        {message.text}
      </div>
      {/* 프로필 */}
      <div>
        <img src="/images/profiles/leewoorim.png" alt="profileImage" />
      </div>
    </main>
  );
}
