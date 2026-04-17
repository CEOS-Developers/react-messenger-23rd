import { useRef, useEffect, useState } from 'react'
import Profile from '@assets/Profile.svg'
import TailWhite from '@assets/TailWhite.svg'
import RightArrow from '@assets/RightArrow.svg'

const MAX_HEIGHT = 440

interface Props {
  name: string
  message: string
  time: string
  unreadCount: number
  showTail: boolean
  showTime: boolean
}

function SendOther({
  name,
  message,
  time,
  unreadCount,
  showTail,
  showTime,
}: Props) {
  const textRef = useRef<HTMLDivElement>(null)
  const [isOverflow, setIsOverflow] = useState(false)

  useEffect(() => {
    if (textRef.current) {
      setIsOverflow(textRef.current.scrollHeight > textRef.current.clientHeight)
    }
  }, [message])

  return (
    <div className="flex flex-row gap-1.5 ">
      <div className="flex flex-col justify-start pt-0.5">
        <button
          className={`w-8 h-8 flex items-center justify-center shrink-0 ${!showTail ? 'invisible' : ''}`}
        >
          <img
            src={Profile}
            className="w-8 h-8"
            alt="profile"
          />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {showTail && <div className="text-gray-95 text-xs">{name}</div>}

        <div className="flex flex-row gap-1 items-end">
          <div className="relative max-w-62.75 px-3 py-2 bg-gray-5 rounded-[14px]">
            {showTail && (
              <img
                src={TailWhite}
                alt=""
                className="absolute -left-[3.5px] top-0.75 w-2 h-4 z-10"
                style={{
                  zIndex: 0,
                }}
              />
            )}

            <div
              ref={textRef}
              style={{ maxHeight: `${MAX_HEIGHT}px` }}
              className="max-w-56.75 wrap-break-word whitespace-pre-wrap text-body1_r leading-5.5 antialiased overflow-hidden"
            >
              {message}
            </div>

            {isOverflow && (
              <button className="flex justify-end items-center gap-0.5 mt-1 w-full cursor-pointer">
                <span className="text-caption1 text-gray-60 antialiased">
                  전체보기
                </span>
                <img
                  src={RightArrow}
                  alt=""
                  className="w-3 h-3"
                />
              </button>
            )}
          </div>
          <div className="flex flex-col">
            {unreadCount > 0 && (
              <span className="text-gray-80 text-caption2_sb antialiased">
                {unreadCount}
              </span>
            )}
            {showTime && (
              <span className="text-gray-70 leading-none text-caption3 antialiased">
                {time}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SendOther
