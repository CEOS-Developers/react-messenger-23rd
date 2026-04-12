import { ChatFooter } from '@/components/chat/ChatFooter';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MainChat } from '@/components/chat/MainChat';

export const ChatPage = () => {
  return (
    <div className="w-full h-svh flex flex-col">
      <ChatHeader/>

      <div className="flex flex-1 w-full overflow-hidden">
        <MainChat />
      </div>

      <ChatFooter/>
    </div>
  );
};
