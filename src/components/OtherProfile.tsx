import { useState } from 'react'
import type { Profile } from '@/types/profile'
import Profile3 from '@assets/icon-profile3.svg'
import EmptyStar from '@assets/icon-star.svg'
import FilledStar from '@assets/icon-star-filled.svg'
import { useMembers } from '@/context/MembersContext'

function OtherProfile({ profile }: { profile: Profile }) {
  const [isActionOpen, setIsActionOpen] = useState(false)
  const { toggleFavorite } = useMembers()

  const handleProfileClick = () => {
    setIsActionOpen((prev) => !prev)
  }

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleFavorite(profile.id)
  }

  return (
    <div className="relative h-15 overflow-hidden ">
      <div className="absolute top-0 left-0 h-full w-16.5">
        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`py-2.5 px-3.5 flex flex-col gap-0.5 h-full w-full items-center justify-center text-white transition-colors duration-200 ${
            profile.favorite ? 'bg-blue-60' : 'bg-gray-50'
          }`}
        >
          <img
            src={profile.favorite ? FilledStar : EmptyStar}
            alt="즐겨찾기 아이콘"
            className="w-5 h-5"
          />
          <span className="text-caption2_sb antialiased whitespace-nowrap">
            즐겨찾기
          </span>
        </button>
      </div>

      <div
        onClick={handleProfileClick}
        className={`flex h-15 cursor-pointer flex-row items-center gap-2 bg-white px-4 py-1 transition-transform duration-300 ${
          isActionOpen ? 'translate-x-18.5' : 'translate-x-0'
        }`}
      >
        <div className="relative">
          <img
            src={Profile3}
            alt="프로필사진"
          />
          {profile.favorite && (
            <svg
              viewBox="0 0 24 24"
              className="absolute -top-1 -left-1 w-5 h-5"
              aria-label="즐겨찾기"
            >
              <path
                d="M8.85044 8.01306L4.42919 9.48606C4.33302 9.51806 4.26735 9.58381 4.23219 9.68331C4.19685 9.78264 4.21127 9.87398 4.27544 9.95731L7.14394 13.9161L7.03694 18.2323C7.03044 18.3413 7.06885 18.4278 7.15219 18.4918C7.23552 18.556 7.32852 18.5721 7.43119 18.5401L11.9984 17.2226L16.5907 18.5151C16.6934 18.5471 16.7864 18.531 16.8697 18.4668C16.953 18.4028 16.9914 18.3163 16.9849 18.2073L16.8504 13.8901L19.7214 9.93231C19.7856 9.84898 19.8 9.75764 19.7647 9.65831C19.7295 9.55881 19.6639 9.49306 19.5677 9.46106L15.1214 8.01306L12.2389 4.28431C12.1811 4.20081 12.1009 4.15906 11.9984 4.15906C11.8959 4.15906 11.8158 4.20081 11.7579 4.28431L8.85044 8.01306Z"
                fill="#207BD5"
              />
            </svg>
          )}
        </div>

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
