import Header from "@/components/Common/Header";
import useScrolled from "@/hooks/useScrolled";

const ChatListPage = () => {
  const { scrolled, handleScroll } = useScrolled();

  return (
    <div className="flex h-full flex-col">
      <Header text="대화" showShadow={scrolled} />
      <main className="flex-1 overflow-y-auto" onScroll={handleScroll}></main>
    </div>
  );
};

export default ChatListPage;
