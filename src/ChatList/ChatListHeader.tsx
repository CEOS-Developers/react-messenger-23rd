import ProfileHeaderInst from '@assets/icon-profileheaderinst.svg'
import ToggleDown from '@assets/icon-toggledown.svg'
import Hamburger from '@assets/icon-hamburger.svg'
import search from '@assets/icon-search.svg'
import ChatPlus from '@assets/icon-chatplus.svg'

function ChatListHeader() {
  return (
    <div className="flex flex-row justify-between border-b-[0.25px] border-gray-30 h-14 p-3">
      <div className="flex flex-row ">
        <img
          src={ProfileHeaderInst}
          alt="단체"
        />
        <button className="cursor-pointer">
          <img
            src={ToggleDown}
            alt="토글"
          />
        </button>
      </div>

      <div className="flex flex-row gap-1">
        <button className="cursor-pointer">
          <img
            src={ChatPlus}
            alt="채팅 추가"
          />
        </button>
        <button className="cursor-pointer">
          <img
            src={Hamburger}
            alt="목록"
          />
        </button>
        <button className="cursor-pointer">
          <img
            src={search}
            alt="돋보기"
          />
        </button>
      </div>
    </div>
  )
}

export default ChatListHeader
