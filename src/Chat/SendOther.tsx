import Profile from '@assets/Profile.svg'
import TailWhite from '@assets/TailWhite.svg'

interface Props {
  name: string
  message: string
  time: string
  unreadCount: number
  showTail: boolean
}

function SendOther({ name, message, time, unreadCount, showTail }: Props) {
  return (
    <div className="flex flex-row gap-[6px] mx-3">
      <div className="flex flex-col justify-start pt-[2px]">
        <button className="w-8 h-8 flex items-center justify-center shrink-0">
          <img
            src={Profile}
            className="w-8 h-8"
            alt="profile"
          />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-[var(--gray-95)] text-xs">{name}</div>

        <div className="flex flex-row gap-1 items-end">
          <div
            className={`
              relative max-w-[70%] px-3 py-2 text-[16px] leading-[22px]
              bg-[var(--gray-5)]
              ${showTail ? 'rounded-2xl rounded-tl-none' : 'rounded-2xl'}
            `}
          >
            {/* 말꼬리 */}
            {showTail && (
              <img
                src={TailWhite}
                alt=""
                className="absolute top-0 -left-[5px] w-[10px] h-[16px]"
                style={{
                  zIndex: 0,
                }}
              />
            )}

            <div className="break-all">{message}</div>
          </div>

          <div className="flex flex-col">
            {unreadCount > 0 && (
              <span className="text-[var(--gray-80)] text-xs">
                {unreadCount}
              </span>
            )}
            <span className="text-[var(--gray-70)] leading-none text-xs">
              {time}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SendOther
