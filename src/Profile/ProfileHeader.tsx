import ProfileHeaderInst from '@assets/ProfileHeaderInst.svg'
import ToggleDown from '@assets/ToggleDown.svg'
import PlusFriend from '@assets/PlusFriend.svg'
import search from '@assets/search.svg'

function ProfileHeader() {
  const handleClick = () => {
    window.open('https://www.kakaowork.com/', '_blank')
  }

  return (
    <div className="flex flex-row justify-between border-b-[0.25px] border-gray-30 h-[56px] p-3">
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
        <button
          className="cursor-pointer"
          onClick={handleClick}
        >
          <img
            src={PlusFriend}
            alt="친구추가"
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

export default ProfileHeader
