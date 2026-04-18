import hamBurger from '@assets/icon-hamburger.svg'
import searchIcon from '@assets/icon-search.svg'
import BackIcon from '@assets/leftArrow'
import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  memberCount: number
}

function ChatHeader({ title, memberCount }: Props) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between py-2 px-1.5 h-13 bg-none border-b border-[0.75px] border-gray-30">
      <div className="flex items-center gap-1">
        <button
          className="w-9 h-9 flex items-center justify-center text-gray-90 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </button>

        <div className="font-semibold antialiased overflow-hidden text-ellipsis whitespace-nowrap text-[17px] leading-5.5 tracking-[-0.17px] text-gray-95">
          {title}{' '}
          <span className="text-gray-50 font-normal">{memberCount}</span>
        </div>
      </div>

      <div className="flex gap-1 text-lg">
        <button className="w-9 h-9 cursor-pointer">
          <img
            src={searchIcon}
            alt="돋보기"
          />
        </button>
        <button className="w-9 h-9 cursor-pointer">
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
