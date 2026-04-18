import RightArrow from '@assets/icon-rightarrow.svg'
function Todo() {
  return (
    <div className="flex flex-row justify-between items-center h-[62px] border-b-[1px] border-gray-20 px-4 py-5">
      <div className="flex flex-row gap-[6px]">
        <p className="text-title2 antialiased">할 일</p>
        <p className="text-body1_r text-blue-50 antialiased">1</p>
      </div>

      <button className="flex flex-row gap-1 items-center cursor-pointer">
        <img
          src={RightArrow}
          className="w-4 h-4"
        />
      </button>
    </div>
  )
}
export default Todo
