//import backArrow from '@assets/left.svg'
import hamBurger from '@assets/hamburg.svg'
import searchIcon from '@assets/search.svg'
import BackIcon from '@assets/leftArrow'

interface Props {
  title: string
}

function ChatHeader({ title }: Props) {
  return (
    <div className="flex items-center justify-between py-2 px-3 h-14 bg-none border-b border-[0.75px] border-[var(--gray-30)]">
      <div className="flex items-center gap-1">
        <button className="w-[36px] h-[36px] p-[6px] flex items-center justify-center text-[var(--gray-90)]">
          <BackIcon className="w-6 h-6" />
        </button>

        <div className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap text-[17px] leading-[22px] tracking-[-0.17px] text-[var(--gray-95)]">
          {title}
        </div>
      </div>

      <div className="flex gap-1 text-lg">
        <button>
          <img
            src={searchIcon}
            alt="돋보기"
            className="w-6 h-6"
          />
        </button>
        <button>
          <img
            src={hamBurger}
            alt="메뉴바"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
