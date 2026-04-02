import { ChatFooter } from '../src/components/chat/ChatFooter';
import { ChatHeader } from '../src/components/chat/ChatHeader';
import { MainChat } from '../src/components/chat/MainChat';

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
