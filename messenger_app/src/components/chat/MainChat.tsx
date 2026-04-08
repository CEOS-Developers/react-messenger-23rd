import { useChatStore } from '../../store/useChatStore';
import { isDifferentDay, formatTime } from '../../utils/time';
import React, { useEffect, useRef } from 'react';

import check_purple from '../../icons/icon_check_purple.svg';
import check_gray from '../../icons/icon_check_gray.svg';

export const MainChat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatRooms, currentRoomId, currentUser, readMessage } = useChatStore();

  const currentRoom = chatRooms.find((room) => room.id === currentRoomId);
  const messages = currentRoom ? currentRoom.messages : [];

  // messages.length가 변경될 때에만 메시지 읽음함수 처리. messages 자체를 불러오면 useEffect가 messages를 변경하고 무한루프 발생 가능
  useEffect(() => {
    readMessage();

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, currentUser.id, readMessage]);

  if (!currentRoom) {
    return <div className="flex-1" />;
  }

  return (
    <div>
      {/* 메인 채팅창 */}
      <div className="flex w-full h-full overflow-y-auto px-4 flex-col pb-4.5">
        {messages.map((msg, index) => {
          const prevMsg = messages[index - 1];
          const nextMsg = messages[index + 1];

          const showDateDivider = isDifferentDay(
            prevMsg?.timestamp,
            msg.timestamp
          );

          const isDifferentSender =
            !prevMsg || prevMsg.senderId !== msg.senderId;
          const marginTopClass = isDifferentSender ? 'mt-3' : 'mt-1';

          const showTime =
            !nextMsg ||
            nextMsg.senderId !== msg.senderId ||
            formatTime(nextMsg.timestamp) !== formatTime(msg.timestamp);

          const isMe = msg.senderId === currentUser.id;

          const senderInfo = currentRoom.participants.find(
            (p) => p.id === msg.senderId
          );

          return (
            <React.Fragment key={msg.id}>
              {/* 날짜 구분선 */}
              {showDateDivider && (
                <div className="flex justify-center mt-4 mb-3">
                  <div className="bg-Gray200 text-caption-01 px-5 rounded-lg">
                    {new Intl.DateTimeFormat('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long',
                    }).format(new Date(msg.timestamp))}
                  </div>
                </div>
              )}

              {/* 개별 메시지 버블 영역, 프로필사진은 일단 없앰 */}
              <div
                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} ${marginTopClass}`}
              >
                {/* {!isMe && (
                  <img
                    src={senderInfo?.profileImage}
                    alt={senderInfo?.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover bg-white shrink-0"
                  />
                )} */}

                <div
                  className={`flex flex-col max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}
                >
                  {!isMe && (isDifferentSender || showDateDivider) && (
                    <span className="text-caption-02 mb-1 ml-1 text-gray-600">
                      {senderInfo?.name}
                    </span>
                  )}

                  <div className="flex items-end gap-1.5">
                    {/* 내 메시지일 때: 말풍선 '왼쪽'에 체크마크와 시간이 위치함 */}
                    {isMe && (
                      <div className="flex flex-col items-end pb-1 text-caption-02 shrink-0 gap-0.5">
                        {msg.isRead ? (
                          <img
                            src={check_purple}
                            alt="읽음"
                            className="w-3 h-3"
                          />
                        ) : (
                          <img
                            src={check_gray}
                            alt="안읽음"
                            className="w-3 h-3"
                          />
                        )}
                        {showTime && <span>{formatTime(msg.timestamp)}</span>}
                      </div>
                    )}

                    {/* 메시지 텍스트 버블 */}
                    <div
                      className={`px-3 py-2 text-body-04 break-words ${
                        isMe
                          ? 'bg-green100 rounded-lg rounded-tr-none'
                          : 'bg-Gray200 rounded-lg rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* 상대방 메시지일 때: 말풍선 '오른쪽'에 시간이 위치함 */}
                    {!isMe && (
                      <div className="flex flex-col items-start pb-1 text-caption-02 shrink-0">
                        <span>{formatTime(msg.timestamp)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        {/* 자동 스크롤을 위한 더미 엘리먼트 */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
