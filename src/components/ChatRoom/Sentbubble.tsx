import type { Message } from "../../types/chat";

interface Props {
  message: Message;
}

export default function SentBubble({ message }: Props) {
  return (
    <main className="flex justify-end items-end gap-1 my-2">
      {/* 대화 내용 */}
      <div
        className="relative bg-main2 text-black px-2.5 py-4 rounded-xl gap-2.5 mr-2 max-w-[70%]
      after:content-[''] after:absolute
      after:top-1/2 after:-translate-y-1/2 after:-right-3
      after:border-t-[6px] after:border-b-[6px] after:border-l-[6px] after:border-r-[6px]
      after:border-l-main2
      after:border-b-transparent after:border-t-transparent after:border-r-transparent"
      >
        {message.text}
      </div>
      {/* 프로필 */}
      <div>
        <img
          src="/images/profiles/leewoorim.png"
          className="w-11 h-11 shrink-0 rounded-md"
          alt="profileImage"
        />
      </div>
    </main>
  );
}
