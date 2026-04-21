import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LuUserPlus } from "react-icons/lu";
import { HiChevronDown } from "react-icons/hi2";

export default function FriendsHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex flex-col px-2.5 py-4 items-center text-white">
      {/* 첫번째 줄 */}
      <div className="flex w-full px-4 pb-4">
        <div className="flex flex-1 justify-center ml-25">
          <h1 className="text-body-01">대화 상대</h1>
        </div>
        <div className="flex flex-1 justify-end">
          <button>
            <LuUserPlus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* 두번째 줄 */}
      <div className="flex w-full items-center justify-center bg-gray80 text-gray40 py-2 mx-4 gap-1 rounded-lg">
        <FiSearch className="w-5 h-5 shrink-0" />
        <input
          type="text"
          placeholder="검색"
          className="focus:outline-none text-body-02 text-start w-12"
        />
      </div>
      {/* 세번째 줄 */}
      <div className="relative flex w-full items-center justify-between text-gray10 bg-gray70 rounded-lg px-4 py-2 mx-4 my-3">
        <span>전체 친구</span>
        <button>
          <HiChevronDown
            onClick={() => setIsOpen(!isOpen)}
            className={`${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <ul className="absolute right-0 top-[110%] z-10 bg-gray80 rounded-lg py-2 overflow-hidden text-gray10">
            {[
              "전체 친구",
              "새 친구",
              "채팅만 가능한 친구",
              "공식 계정",
              "서비스 계정",
            ].map((menu) => (
              <li
                key={menu}
                className={`px-5 py-3 cursor-pointer hover:bg-gray70 ${
                  menu === "전체 친구" ? "bg-gray70" : ""
                }`}
              >
                {menu}
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
