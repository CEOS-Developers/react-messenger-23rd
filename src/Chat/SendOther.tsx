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
    <div className="flex flex-row gap-[6px] ">
      <div className="flex flex-col justify-start pt-[2px]">
        {showTail && (
          <button className="w-8 h-8 shrink-0 flex items-center justify-center shrink-0">
            <img
              src={Profile}
              className="w-8 h-8"
              alt="profile"
            />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-[var(--gray-95)] text-xs">{name}</div>

        <div className="flex flex-row gap-1 items-end">
          {/* 3번 div*/}
          <div className="relative max-w-[351px] px-3 py-2 bg-[var(--gray-5)] rounded-[14px] flex items-center justify-center">
            {showTail && (
              <img
                src={TailWhite}
                alt=""
                className="absolute -left-[3.5px] top-[3px] w-[8px] h-[16px] z-10"
                style={{
                  zIndex: 0,
                }}
              />
            )}

            <div className="max-w-[264px] break-words text-[16px] font-normal leading-[22px] antialiased">
              {message}
            </div>
          </div>
          <div className="flex flex-col">
            {unreadCount > 0 && (
              <span className="text-[var(--gray-80)] text-[11px] font-semibold antialiased">
                {unreadCount}
              </span>
            )}
            {showTime && (
              <span className="text-[var(--gray-70)] leading-none text-[10px] font-normal antialiased">
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
