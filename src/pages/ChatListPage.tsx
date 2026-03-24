import Header from "@/components/Common/Header";

const ChatListPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Header text="대화" />
      <div className="flex-1 overflow-y-auto">{/* 페이지 내용 */}</div>
    </div>
  );
};

export default ChatListPage;
