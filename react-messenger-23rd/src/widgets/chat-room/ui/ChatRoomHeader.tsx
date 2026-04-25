// 채팅방 상단 헤더.
// 뒤로가기, 채팅방 이름, 검색, 메뉴 버튼 같은 거.
import { useNavigate } from 'react-router-dom';

import hamburgerIcon from '@/shared/assets/icons/chat-room/hamburger(24_24).svg';
import backIcon from '@/shared/assets/icons/chat-room/My_Text Box/Back (32_32).svg';
import searchIcon from '@/shared/assets/icons/chat-room/search(24_24).svg';

interface ChatRoomHeaderProps {
  title: string;
  onFlip: () => void;
  isFlipped: boolean;
}

const ChatRoomHeader = ({ title, onFlip, isFlipped }: ChatRoomHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center border-b border-gray-20 bg-bg px-4 py-3">
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-30"
        >
          <img src={backIcon} alt="뒤로가기" className="h-8 w-8" />
        </button>
        <span className="Heading02R text-gray-80">999+</span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <button type="button" onClick={onFlip}>
          <h1 className="Heading02SB text-gray-90">{isFlipped ? '고다현' : title}</h1>
        </button>
      </div>

      <div className="flex w-16 justify-end gap-3">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-30"
        >
          <img src={searchIcon} alt="검색" className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-30"
        >
          <img src={hamburgerIcon} alt="햄버거" className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default ChatRoomHeader;
