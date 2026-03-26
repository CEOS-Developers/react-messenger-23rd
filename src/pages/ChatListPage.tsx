import { useNavigate } from "react-router-dom";

import Header from "@/components/Common/Header";
import useScrolled from "@/hooks/useScrolled";

const ChatListPage = () => {
  const { scrolled, handleScroll } = useScrolled();
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col">
      <Header text="대화" showShadow={scrolled} />
      <main className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        <button
          onClick={() => navigate("/chat/1")}
          className="cursor-pointer p-4 text-blue-500 underline"
        >
          채팅방으로 이동(채팅목록 구현 전 임시 버튼)
        </button>
      </main>
    </div>
  );
};

export default ChatListPage;
