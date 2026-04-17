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

      <div className="relative max-w-66 px-3 py-2 bg-blue-20 rounded-[14px] flex items-center">
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

        <div className="max-w-60.5 wrap-break-word text-body1_r leading-5.5 antialiased">
          {message}
        </div>
      </div>
    </div>
  )
}
export default SendMe
