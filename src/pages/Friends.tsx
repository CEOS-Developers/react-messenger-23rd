import { useEffect, useState } from "react";
import FriendsHeader from "../components/Friends/FriendsHeader";
import type { User } from "../types/chat";
import { HiStar, HiOutlineStar } from "react-icons/hi2";

export default function FriendsPage() {
  //친구 목록 불러오기
  const [friends, setFriends] = useState<User[]>([]);
  useEffect(() => {
    const savedFriends = localStorage.getItem("users");

    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  }, []);

  //즐겨찾기 로직
  const handleFavorite = (id: string) => {
    const updatedFriends = friends.map((friend) =>
      friend.id === id ? { ...friend, isFavorite: !friend.isFavorite } : friend
    );

    setFriends(updatedFriends);

    localStorage.setItem("users", JSON.stringify(updatedFriends));
  };

  //즐겨찾기 가나다순 정렬
  const sortedFavoriteFriends = friends
    .filter((f) => f.isFavorite)
    .sort((a, b) => a.name.localeCompare(b.name, "ko"));

  //가나다순 정렬
  const allFriends = [...friends].sort((a, b) =>
    a.name.localeCompare(b.name, "ko")
  );

  return (
    <div className="flex flex-col">
      <FriendsHeader />
      <main className="pb-24">
        {/* 즐겨찾기 */}
        {sortedFavoriteFriends.length > 0 && (
          <section className="mt-4">
            <h1 className="pt-6 pb-3 px-4 text-body-02 text-gray10">
              즐겨찾기
            </h1>
            <hr />
            <ul className="flex flex-col gap-5 pt-3 px-4">
              {sortedFavoriteFriends.map((friend) => (
                <FriendsItem
                  key={friend.id}
                  friend={friend}
                  onToggle={() => handleFavorite(friend.id)}
                />
              ))}
            </ul>
          </section>
        )}

        {/* 전체친구 */}
        <section className="mt-4">
          <h1 className="pt-6 pb-3 px-4 text-body-02 text-gray10">전체 친구</h1>
          <hr />
          <ul className="flex flex-col gap-5 pt-3 px-4">
            {allFriends.map((friend) => (
              <FriendsItem
                key={friend.id}
                friend={friend}
                onToggle={() => handleFavorite(friend.id)}
              />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function FriendsItem({
  friend,
  onToggle,
}: {
  friend: User;
  onToggle: () => void;
}) {
  return (
    <li className="flex gap-3 items-center">
      {/* 즐겨찾기 별 색 바꾸기 */}
      <button onClick={onToggle} className="focus:outline-none w-4 h-4">
        {friend.isFavorite ? (
          <HiStar className="text-main2" />
        ) : (
          <HiOutlineStar />
        )}
      </button>
      <img
        src={friend.profileImage || "/default-profile.png"}
        alt={friend.name}
        className="w-13.25 h-13.25 rounded-lg"
      />
      <div className="flex flex-col gap-1">
        <span className="text-gray10 text-body-02">{friend.name}</span>
        <span className="text-gray30 text-caption-02">
          {friend.statusMessage}
        </span>
      </div>
    </li>
  );
}
