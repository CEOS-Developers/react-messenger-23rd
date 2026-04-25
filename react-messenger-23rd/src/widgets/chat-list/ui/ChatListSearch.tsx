import searchIcon from '@/shared/assets/icons/chat-list/search(20_20).svg';
import toggleIcon from '@/shared/assets/icons/chat-list/Toggle.svg';

const ChatListSearch = () => {
  return (
    <section className="bg-white px-4 py-1 mb-3">
      {/*검색창*/}
      <div className="flex items-center rounded-[100px] bg-gray-10 p-3">
        <img src={searchIcon} alt="검색" className="mr-3 h-5 w-5" />

        <input type="text" placeholder="" className="flex-1 bg-transparent Body02R outline-none" />
      </div>

      {/*읽지 않은 메시지 토글*/}
      <div className="flex justify-end items-center gap-1 py-4">
        <span className="Caption01M text-gray-60">읽지 않은 메시지</span>

        <button type="button">
          <img src={toggleIcon} alt="토글" className="w-8 h-5" />
        </button>
      </div>
    </section>
  );
};

export default ChatListSearch;
