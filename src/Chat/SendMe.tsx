import { useRef, useEffect, useState } from 'react'
import TailBlue from '@assets/icon-tailblue.svg'
import RightArrow from '@assets/icon-rightarrow.svg'

const MAX_HEIGHT = 440

interface Props {
  message: string
  time: string
  unreadCount: number
  showTail: boolean
  showTime: boolean
}

function SendMe({ message, time, unreadCount, showTail, showTime }: Props) {
  const textRef = useRef<HTMLDivElement>(null)
  const [isOverflow, setIsOverflow] = useState(false)

  useEffect(() => {
    if (textRef.current) {
      setIsOverflow(textRef.current.scrollHeight > textRef.current.clientHeight)
    }
  }, [message])

  return (
    <div className="flex flex-row gap-1 items-end ">
      <div className="flex flex-col items-end">
        {unreadCount > 0 && (
          <span className="text-gray-80 text-[11px] font-semibold antialiased">
            {unreadCount}
          </span>
        )}
        {showTime && (
          <span className="text-gray-70 leading-none text-[10px] font-normal antialiased">
            {time}
          </span>
        )}
      </div>

      <div className="relative max-w-66 px-3 py-2 bg-blue-20 rounded-[14px]">
        {showTail && (
          <img
            src={TailBlue}
            alt=""
            className="absolute -right-[3.5px] top-0.75 w-2 h-4 z-10"
            style={{
              zIndex: 0,
            }}
          />
        )}

        <div
          ref={textRef}
          style={{ maxHeight: `${MAX_HEIGHT}px` }}
          className="max-w-60.5 wrap-break-word whitespace-pre-wrap text-body1_r leading-5.5 antialiased overflow-hidden"
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
    </div>
  )
}
export default SendMe
