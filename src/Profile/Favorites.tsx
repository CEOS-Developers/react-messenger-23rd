import { useState } from 'react'
import RightArrow from '@assets/icon-rightarrow.svg'
import OtherProfile from '@/components/OtherProfile'
import { useMembers } from '@/context/MembersContext'

function Favorites() {
  const { members } = useMembers()
  const [isOpen, setIsOpen] = useState(false)

  const favoriteMembers = members.filter((member) => member.favorite)

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="border-b- border-gray-20">
      <div
        onClick={handleToggle}
        className="flex flex-row justify-between items-center h-15.5 px-4 py-5 cursor-pointer"
      >
        <div className="flex flex-row gap-1.5">
          <p className="text-title2 antialiased">즐겨찾기</p>
          <p className="text-body1_r text-gray-70 antialiased">
            {favoriteMembers.length}
          </p>
        </div>

        <button
          type="button"
          aria-label={isOpen ? '즐겨찾기 닫기' : '즐겨찾기 열기'}
          className="flex flex-row gap-1 items-center"
        >
          <img
            src={RightArrow}
            alt="화살표"
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="pb-2">
          {favoriteMembers.map((member) => (
            <OtherProfile
              key={member.id}
              profile={member}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
