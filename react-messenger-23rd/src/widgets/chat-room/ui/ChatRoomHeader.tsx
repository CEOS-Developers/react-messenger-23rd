// 채팅방 상단 헤더.
// 뒤로가기, 채팅방 이름, 검색, 메뉴 버튼 같은 거.
import hamburgerIcon from '@/shared/assets/icons/chat-room/hamburger(24_24).svg';
import backIcon from '@/shared/assets/icons/chat-room/My_Text Box/Back (32_32).svg';
import searchIcon from '@/shared/assets/icons/chat-room/search(24_24).svg';

const ChatRoomHeader = () => {
  return (
    <header className="flex items-center border-b border-[var(--color-gray-20)] bg-[var(--color-bg)] px-4 py-3">
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--color-gray-30)]"
        >
          <img src={backIcon} alt="뒤로가기" className="h-8 w-8" />
        </button>
        <span className="text-base text-[var(--color-gray-80)]">999+</span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-base font-semibold text-[var(--color-gray-90)]">백하린</h1>
      </div>

      <div className="flex w-16 justify-end gap-3">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--color-gray-30)]"
        >
          <img src={searchIcon} alt="검색" className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--color-gray-30)]"
        >
          <img src={hamburgerIcon} alt="햄버거" className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default ChatRoomHeader;
