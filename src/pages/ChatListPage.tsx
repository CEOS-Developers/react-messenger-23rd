import ChatTime from "@/components/ChatList/ChatTime";
import CreateChatButton from "@/components/ChatList/CreateChatButton";
import Alert from "@/components/Common/Alert";
import Header from "@/components/Common/Header";
import ProfileImage from "@/components/Common/ProfileImage";
import usersData from "@/data/users.json";
import useScrolled from "@/hooks/useScrolled";

const { users } = usersData;

const u = (...ids: number[]) => ids.map(id => users.find(user => user.userId === id)!);

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
        <div className="flex flex-col gap-4 p-4">
          <ProfileImage profiles={u(2)} />
          <ProfileImage profiles={u(5, 6)} />
          <ProfileImage profiles={u(2, 3, 4)} />
          <ProfileImage profiles={u(2, 4, 6, 8)} />
        </div>
      </main>
    </div>
  );
};

export default ChatListPage;
