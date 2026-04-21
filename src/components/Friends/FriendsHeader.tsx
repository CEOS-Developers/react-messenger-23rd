// import { useNavigate } from "react-router-dom";
import { LuUserPlus } from "react-icons/lu";

// interface Props {
//   name: string;
// }

export default function FriendsHeader() {
  // const navigate = useNavigate();

  return (
    <header className="flex flex-col w-full px-2.5 py-4 items-center text-white">
      {/* 첫번째 줄 */}
      <div className="flex w-full">
        <div className="flex flex-1 justify-center ml-35.5">
          <h1 className="text-body-01">대화 상대</h1>
        </div>
        <div className="flex flex-1 justify-end">
          <button>
            <LuUserPlus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* 두번째 줄 */}
      <span>(검색)</span>
      {/* 세번째 줄 */}
      <span>(드롭다운)</span>
    </header>
  );
}
