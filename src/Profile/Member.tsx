import RightArrow from '@assets/RightArrow.svg'
import { useNavigate } from 'react-router-dom'

function Member() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-row justify-between items-center h-[62px] border-b-[1px] border-gray-20 px-4 py-5">
      <div className="flex flex-row gap-[6px]">
        <p className="text-title2 antialiased">전체보기</p>
        <p className="text-body1_r text-gray-70 antialiased">778</p>
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
