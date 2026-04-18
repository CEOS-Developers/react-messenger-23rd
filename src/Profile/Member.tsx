import RightArrow from '@assets/icon-rightarrow.svg'
import { useNavigate } from 'react-router-dom'
import { useMembers } from '@/context/MembersContext'

function Member() {
  const navigate = useNavigate()
  const { members } = useMembers()

  return (
    <div className="flex flex-row justify-between items-center h-15.5 border-b border-gray-20 px-4 py-5">
      <div className="flex flex-row gap-1.5">
        <p className="text-title2 antialiased">전체보기</p>
        <p className="text-body1_r text-gray-70 antialiased">
          {members.length}
        </p>
      </div>

      <button
        onClick={() => navigate('/friends')}
        className="flex flex-row gap-1 items-center cursor-pointer"
      >
        <span className="text-body4_r text-gray-60 antialiased">전체보기</span>
        <img
          src={RightArrow}
          className="w-4 h-4"
        />
      </button>
    </div>
  )
}
export default Member
