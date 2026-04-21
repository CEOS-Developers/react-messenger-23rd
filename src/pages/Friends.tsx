import { useEffect, useState } from "react";
import FriendsHeader from "../components/Friends/FriendsHeader";
import type { User } from "../types/chat";
import { HiStar, HiOutlineStar } from "react-icons/hi2";

export default function FriendsPage() {
  //친구 목록 불러오기
  const [friends, setFriends] = useState<User[]>([]);
  useEffect(() => {
    const savedFriends = localStorage.getItem("friends");

    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  }, []);

  // 가나다순 정렬
  const sortedFriends = [...friends].sort((a, b) => {
    return a.name.localeCompare(b.name, "ko");
  });

  return (
    <div className="flex flex-col">
      <FriendsHeader />
      <main>
        {/* 즐겨찾기 */}
        {/* 전체친구 */}
        <div>
          <h1 className="pt-6 pb-3 px-4 text-body-02 text-gray10">전체 친구</h1>
          <hr />
          <ul className="px-4 py-3 flex flex-col gap-6">
            {sortedFriends.map((friend) => (
              <li key={friend.id} className="flex gap-3 items-center">
                <HiOutlineStar />
                <img
                  src={friend.profileImage || "/default-profile.png"}
                  alt={friend.name}
                  className="w-13.25 h-13.25"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-gray10 text-body-02">
                    {friend.name}
                  </span>
                  <span className="text-gray30 text-caption-02">
                    {friend.statusMessage}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

// 2순위: 친구 목록 데이터 렌더링 (전체 친구)
// 이유: 이미 로컬스토리지에 유저 데이터를 저장해 두셨으니, 그걸 불러와서 리스트로 뿌려주는 작업을 먼저 합니다.

// 작업: localStorage.getItem("users")로 데이터를 가져와서 map 함수로 친구 아이템들을 렌더링합니다.

// 3순위: 즐겨찾기(Favorites) 섹션 분리
// 이유: 유진 님이 보내주신 디자인을 보면 '즐겨찾기'와 '전체 친구' 섹션이 나뉘어 있죠?

// 작업: 불러온 전체 유저 배열을 filter 함수로 두 개로 나눕니다.

// const favorites = users.filter(u => u.isFavorite);

// const others = users.filter(u => !u.isFavorite);

// 4순위: 드롭다운 및 검색 UI 구현
// 이유: 디자인에 있는 '전체 친구' 선택 드롭다운과 검색창은 스타일링 요소가 많으니 마지막에 디테일을 잡아줍니다.
