import ChatTime from "@/components/ChatList/ChatTime";
import CreateChatButton from "@/components/ChatList/CreateChatButton";
import Alert from "@/components/Common/Alert";
import Header from "@/components/Common/Header";
import useScrolled from "@/hooks/useScrolled";

const ChatListPage = () => {
  const { scrolled, handleScroll } = useScrolled();

  return (
    <div className="flex h-full flex-col">
      <Header text="대화" showShadow={scrolled} />
      <main className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        <Alert count={100} />
        <Alert count={9} />
        <CreateChatButton />
        <ChatTime time="오후 10:53" isRead={true} />
        <ChatTime time="오후 10:53" isRead={true} isFixed={true} />
        <ChatTime time="오후 10:53" isRead={false} />
        <ChatTime time="오후 10:53" isRead={false} isFixed={true} />
      </main>
    </div>
  );
};

export default ChatListPage;
