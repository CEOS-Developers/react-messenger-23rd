import { useState } from 'react'
import type { Profile } from '@/types/profile'
import Profile3 from '@assets/Profile3.svg'
import EmptyStar from '@assets/Star.svg'
import FilledStar from '@assets/Star_filled.svg'

function OtherProfile({ profile }: { profile: Profile }) {
  const [isActionOpen, setIsActionOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(profile.favorite)

  const handleProfileClick = () => {
    setIsActionOpen((prev) => !prev)
  }

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsFavorite((prev) => !prev)
  }

  return (
    <div className="relative h-[60px] overflow-hidden ">
      <div className="absolute top-0 left-0 h-full w-[66px]">
        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`py-[10px] px-14px] flex flex-col gap-0.5 h-full w-full flex-col items-center justify-center text-white transition-colors duration-200 ${
            isFavorite ? 'bg-blue-60' : 'bg-gray-50'
          }`}
        >
          <img
            src={isFavorite ? FilledStar : EmptyStar}
            alt="즐겨찾기 아이콘"
            className="w-5 h-5"
          />
          <span className="text-caption2_sb antialiased">즐겨찾기</span>
        </button>
      </div>

      <div
        onClick={handleProfileClick}
        className={`flex h-[60px] cursor-pointer flex-row items-center gap-2 bg-white px-4 py-1 transition-transform duration-300 ${
          isActionOpen ? 'translate-x-[74px]' : 'translate-x-0'
        }`}
      >
        <img
          src={Profile3}
          alt="프로필사진"
        />

        <div className="flex flex-col">
          <p className="text-body2_m antialiased">{profile.name}</p>
          <p className="text-body4_r text-gray-70 antialiased">
            {profile.major}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OtherProfile
