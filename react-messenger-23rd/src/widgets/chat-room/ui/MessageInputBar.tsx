// 하단 채팅 입력창 전체 레이아웃, button부분은 enter로 채팅이 보내지게 수정해야됨.
import smileIcon from '@/shared/assets/icons/chat-room/face-smile.svg';
import microPhoneIcon from '@/shared/assets/icons/chat-room/microphone-01.svg';
import plusIcon from '@/shared/assets/icons/chat-room/plus.svg';

const MessageInputBar = () => {
  return (
    <div className="bg-white px-4 pt-2 pb-8">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-gray-30)]"
        >
          <img src={plusIcon} alt="추가" className="h-6 w-6" />
        </button>

        <div className="flex flex-1 items-center gap-2 pr-4 rounded-2xl border border-[var(--color-gray-30)]">
          <input
            type="text"
            placeholder=""
            className="flex-1 rounded-1xl bg-transparent outline-none px-4 py-2 text-base focus:outline-none"
          />
          <button type="button" className="flex items-center justify-center">
            <img src={microPhoneIcon} alt="음성메세지" className="h-6 w-6" />
          </button>
          <button type="button" className="flex itmes-center justify-center">
            <img src={smileIcon} alt="이모티콘" className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInputBar;
