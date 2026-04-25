// 메시지 한 개.
import type { User } from '@/entities/user/model/types';

import type { Message } from '../model/types';

interface MessageBubbleProps {
  message: Message;
  user: User;
  showTime: boolean;
  showProfile: boolean;
  isFlipped: boolean;
  marginClass: string;
}

const MessageBubble = ({ message, user, showTime, showProfile, isFlipped, marginClass }: MessageBubbleProps) => {
  const isMe = isFlipped ? message.userId !== 'me' : message.userId === 'me';

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
            {showProfile && <p className="Caption01M text-gray-80">{user.name}</p>}

            <div className="flex items-end gap-1">
              <div className="max-w-[232px] font-normal rounded-bl-[8px] rounded-br-[8px] rounded-tr-[8px] px-3 py-2 bg-white text-gray-80">
                <p className="break-words Body02R">{message.messages}</p>
              </div>

              {showTime && <span className="Caption02R text-gray-60">{message.time}</span>}
            </div>
          </div>
        </div>
      )}

      {isMe && (
        <div className="flex items-end gap-1">
          {showTime && <span className="Caption02R text-[var(--color-gray-60)]">{message.time}</span>}

          <div className="rounded-bl-[8px] rounded-br-[8px] rounded-tl-[8px] bg-textbox px-3 py-2">
            <p className="max-w-[232px] break-words text-right Body02R text-white">{message.messages}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
