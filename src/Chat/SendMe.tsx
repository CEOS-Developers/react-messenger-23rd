import TailBlue from '@assets/TailBlue.svg'

interface Props {
  message: string
  time: string
  unreadCount: number
  showTail: boolean
  showTime: boolean
}

function SendMe({ message, time, unreadCount, showTail, showTime }: Props) {
  return (
    <div className="flex flex-row gap-1 items-end ">
      <div className="flex flex-col items-end">
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

      <div className="relative max-w-[351px] px-3 py-2 bg-[var(--blue-20)] rounded-[14px] flex items center">
        {showTail && (
          <img
            src={TailBlue}
            alt=""
            className="absolute -right-[3.5px] top-[3px] w-[8px] h-[16px] z-10"
            style={{
              zIndex: 0,
            }}
          />
        )}

        <div className="max-w-[264px] break-words text-[16px] leading-[22px] font-[400 antialiased">
          {message}
        </div>
      </div>
    </div>
  )
}
export default SendMe
