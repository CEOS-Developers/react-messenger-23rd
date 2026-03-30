//import backArrow from '@assets/left.svg'
import hamBurger from '@assets/Hamburger.svg'
import searchIcon from '@assets/search.svg'
import BackIcon from '@assets/leftArrow'

interface Props {
  title: string
}

function ChatHeader({ title }: Props) {
  return (
    <div className="flex items-center justify-between py-2 px-3 h-[52px] bg-none border-b border-[0.75px] border-[var(--gray-30)]">
      <div className="flex items-center gap-1">
        <button className="w-[36px] h-[36px] flex items-center justify-center text-[var(--gray-90)]">
          <BackIcon />
        </button>

        <div className="font-semibold antialiased overflow-hidden text-ellipsis whitespace-nowrap text-[17px] leading-[22px] tracking-[-0.17px] text-[var(--gray-95)]">
          {title}
        </div>
      </div>

      <div className="flex gap-1 text-lg">
        <button className="w-[36px] h-[36px]">
          <img
            src={searchIcon}
            alt="돋보기"
          />
        </button>
        <button className="w-[36px] h-[36px] ">
          <img
            src={hamBurger}
            alt="메뉴바"
          />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
