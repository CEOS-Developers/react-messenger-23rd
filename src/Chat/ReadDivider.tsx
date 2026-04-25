import HereArrow from '@assets/icon-here.svg'

function ReadDivider() {
  return (
    <div className="flex justify-center my-3">
      <span className="flex items-center gap-0.5 bg-gray-40 text-gray-95 text-caption2_r antialiased px-3 py-1 rounded-full">
        <img src={HereArrow} className="w-4 h-4" />
        여기까지 읽었습니다.
      </span>
    </div>
  )
}

export default ReadDivider
