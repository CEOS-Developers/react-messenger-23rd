import Profile from '@assets/Profile.svg'
import TailWhite from '@assets/TailWhite.svg'

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
          {/* 3번 div*/}
          <div className="relative max-w-62.75 px-3 py-2 bg-gray-5 rounded-[14px] flex items-center justify-center">
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

            <div className="max-w-56.75 wrap-break-word text-body1_r leading-5.5 antialiased">
              {message}
            </div>
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
