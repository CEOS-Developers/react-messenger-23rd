import arrow_left from '../src/assets/icon/arrow_left.svg';
import video from '../src/assets/icon/video.svg';
import call from '../src/assets/icon/call.svg';
import add from '../src/assets/icon/add.svg';
import shapes from '../src/assets/icon/shapes.svg';
import send from '../src/assets/icon/send.svg';
import check_purple from '../src/assets/icon/check_purple.svg';
import check_gray from '../src/assets/icon/check_gray.svg';

import profile from '../src/assets/profile.jpg';

import { useChatStore } from '../src/store/useChatStore';
import React, { useEffect, useRef, useState } from 'react';

const CHAT_COUNTS = 29;
const NAME = '김예린';

export const ChatPage = () => {
  const [inputText, setInputText] = useState('');
  const { currentUser, messages, sendMessage, readMessage } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // messages.length가 변경될 때에만 메시지 읽음함수 처리. messages 자체를 불러오면 useEffect가 messages를 변경하고 무한루프 발생 가능
  useEffect(() => {
    readMessage();

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, currentUser.id, readMessage]);

  // 날짜 변경 확인 함수
  const isDifferentDay = (
    prevDateString: string | undefined,
    currentDateString: string
  ) => {
    if (!prevDateString) return true;
    const prevDate = new Date(prevDateString).setHours(0, 0, 0, 0);
    const currentDate = new Date(currentDateString).setHours(0, 0, 0, 0);
    return prevDate !== currentDate;
  };

  // 시간 포맷함수
  const formatTime = (dateString: string) => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* 상단바(헤더) */}
      <header className="w-full px-4 h-12 flex flex-row items-center justify-between bg-Ivory">
        <div className="flex w-12 h-7 items-center justify-between">
          <img src={arrow_left} alt="" />
          <div className="text-body-02">{CHAT_COUNTS}</div>
        </div>

        <img
          src={profile}
          alt=""
          className="w-8 h-8 rounded-full overflow-auto ml-5 mr-2"
        />
        <p className="text-body-01 mr-auto">{NAME}</p>

        <img src={video} alt="" className="w-6 h-6 gap-3" />
        <img src={call} alt="" className="w-6 h-6 ml-3" />
      </header>

      {/* 메인 채팅창 */}
      <div className="w-full h-full overflow-auto px-4 py-4 flex flex-col gap-4 pb-20">
        {messages.map((msg, index) => {
          const prevMsg = messages[index - 1];
          const showDateDivider = isDifferentDay(
            prevMsg?.timestamp,
            msg.timestamp
          );
          const isMe = msg.senderId === currentUser.id;

          return (
            <React.Fragment key={msg.id}>
              {/* 날짜 구분선 */}
              {showDateDivider && (
                <div className="flex justify-center">
                  <div className="bg-Gray200 text-body-04 px-4 mb-5 rounded-[8px]">
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
                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
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
                  {/* 이름 생기면 주석에서 빼기 {!isMe && (
                    <span className="text-caption-02 mb-1 ml-1">
                      {senderInfo?.name}
                    </span>
                  )} */}

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
                        <span>{formatTime(msg.timestamp)}</span>
                      </div>
                    )}

                    {/* 메시지 텍스트 버블 */}
                    <div
                      className={`px-3 py-2 text-body-04 shadow-sm break-words ${
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

      {/* 하단 메뉴 및 채팅 입력창 */}
      <div className="absolute bottom-0 w-full h-20 px-4 py-3 shrink-0 bg-Ivory z-10">
        <div className="w-full h-full flex items-start mb-5">
          <img src={add} alt="" className="w-9 h-9 mr-2" />
          <div className="w-full h-11">
            <form
              onSubmit={handleSubmit}
              className="flex justify-between bg-white w-full h-full rounded-[13.5px] px-4 py-2.5"
            >
              <input
                type="text"
                placeholder="메시지 입력"
                className="outline-none w-full bg-transparent"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                type="submit"
                className="shrink-0 ml-2"
                onMouseDown={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
              >
                {inputText ? (
                  <img src={send} alt="" className="w-7 h-7" />
                ) : (
                  <img src={shapes} className="w-7 h-7" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
