import newChattingIcon from '@/shared/assets/icons/chat-list/new chatting(24_24).svg';
import settingIcon from '@/shared/assets/icons/chat-list/settings-02.svg';

const ChatListHeader = () => {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <h1 className="Heading01SB">채팅</h1>

      <div className="flex items-center gap-4">
        <button type="button" className="flex h-6 w-6 items-center justify-center">
          <img src={newChattingIcon} alt="새로운채팅" className="h-6 w-6" />
        </button>
        <button type="button" className="flex h-6 w-6 items-center justify-center">
          <img src={settingIcon} alt="설정" className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default ChatListHeader;
