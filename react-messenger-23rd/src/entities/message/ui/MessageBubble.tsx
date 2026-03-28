// 메시지 한 개.
import type { User } from '@/entities/user/model/types';
import rawUsers from '@/entities/user/model/users.json';

import type { Message } from '../model/types';

interface MessageBubbleProps {
  message: Message;
  showTime: boolean;
  showProfile: boolean;
  isFlipped: boolean;
  marginClass: string;
}

const users = rawUsers as User[];

const MessageBubble = ({ message, showTime, showProfile, isFlipped, marginClass }: MessageBubbleProps) => {
  const isMe = isFlipped ? message.userId !== 'me' : message.userId === 'me';

  const user = users.find((item) => item.id === message.userId);

  if (!user) return null;

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${marginClass}`}>
      {!isMe && (
        <div className="flex items-start gap-2">
          <button type="button" className="shrink-0 self-start">
            {showProfile ? (
              <img src={user.profileImage} alt={`${user.name} 프로필`} className="h-7 w-7" />
            ) : (
              <div className="h-7 w-7" />
            )}
          </button>

          <div className="flex min-w-0 flex-col">
            {showProfile && (
              <p className="mb-1 text-sm leading-6 font-medium text-[var(--color-gray-80)]">{user.name}</p>
            )}

            <div className="flex items-end gap-1">
              <div className="max-w-[232px] font-normal rounded-bl-[8px] rounded-br-[8px] rounded-tr-[8px] px-3 py-2 bg-white text-[var(--color-gray-80)]">
                <p className="break-words text-[15px] font-normal leading-[150%] tracking-[-0.5px]">
                  {message.messages}
                </p>
              </div>

              {showTime && <span className="text-xs leading-4 text-[var(--color-gray-60)]">{message.time}</span>}
            </div>
          </div>
        </div>
      )}

      {isMe && (
        <div className="flex items-end gap-1">
          {showTime && <span className="text-xs leading-4 text-[var(--color-gray-60)]">{message.time}</span>}

          <div className="rounded-bl-[8px] rounded-br-[8px] rounded-tl-[8px] bg-[var(--color-textbox)] px-3 py-2">
            <p className="max-w-[232px] break-words text-right text-[15px] font-normal leading-[150%] tracking-[-0.5px] text-white">
              {message.messages}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
