// 메시지 한 개.
import otherProfile from '@/shared/assets/icons/chat-room/Frame 73.svg';

import type { Message } from '../model/types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isMe = message.sender === 'me';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
      {/*일단 상대방 이름 하드코딩*/}
      {!isMe && (
        <div className="flex itmes-start gap-2">
          <button type="button" className="shrink-0 self-start">
            <img src={otherProfile} alt="상대방프로필" className="h-7 w-7" />
          </button>

          <div className="flex min-w-0 flex-col">
            <p className="mb-1 text-sm leading-6 font-medium text-[var(--color-gray-80)]">백하린</p>

            <div className="flex items-end gap-1">
              <div className="max-w-72 rounded-bl-xl rounded-br-xl rounded-tr-xl px-4 py-2 text-base leading-base bg-white text-[var(--color-gray-80)]">
                {message.messages}
              </div>

              <span className="text-xs leading-4 text-[var(--color-gray-60)]">{message.time}</span>
            </div>
          </div>
        </div>
      )}

      {isMe && (
        <div className="flex items-end gap-1">
          <span className="text-xs leading-4 text-[var(--color-gray-60)]">{message.time}</span>

          <div className="flex-1 max-w-72 text-right rounded-bl-xl rounded-br-xl rounded-tl-xl bg-[var(--color-main)] px-4 py-2 text-base leading-6 text-white">
            {message.messages}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
