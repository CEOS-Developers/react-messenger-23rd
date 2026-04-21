import { useEffect, useState } from "react";
import FriendsHeader from "../components/Friends/FriendsHeader";
import type { User } from "../types/chat";
import type { Room } from "../types/room";

import { HiStar, HiOutlineStar } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function FriendsPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

  //친구, 방 목록 불러오기
  const [friends, setFriends] = useState<User[]>([]);
  useEffect(() => {
    const savedFriends = localStorage.getItem("users");
    const savedRooms = localStorage.getItem("rooms");

    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }

    if (savedRooms) {
      setRooms(JSON.parse(savedRooms));
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

  //클릭한 상대와의 채팅방으로 이동하는 함수
  const handleFriendClick = (friendId: string) => {
    // '이우림'인 경우에만 가능
    const currentUserId = "user-1";

    const existingRoom = rooms.find(
      (room) =>
        room.participants.includes(currentUserId) &&
        room.participants.includes(friendId)
    );
    //채팅 기록이 있는 경우
    if (existingRoom) {
      navigate(`/chatroom/${existingRoom.id}`);
    } else {
      // 채팅 기록이 없는 경우
      const newRoomId = `room-${Date.now()}`;
      const newRoom = {
        id: newRoomId,
        participants: [currentUserId, friendId],
        lastMessage: "",
        updatedAt: new Date().toISOString(),
      };

      const updatedRooms = [...rooms, newRoom];
      localStorage.setItem("rooms", JSON.stringify(updatedRooms));
      setRooms(updatedRooms);

      navigate(`/chatroom/${newRoomId}`);
    }
  };

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
                  onClick={() => handleFriendClick(friend.id)}
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
                onClick={() => handleFriendClick(friend.id)}
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
  onClick,
}: {
  friend: User;
  onToggle: () => void;
  onClick: () => void;
}) {
  return (
    <li className="flex gap-3 items-center">
      {/* 즐겨찾기 별 색 바꾸기 */}
      <button
        onClick={(e) => {
          e.stopPropagation(); //별 누를때는 채팅방 이동 안하게
          onToggle();
        }}
        className="focus:outline-none w-4 h-4"
      >
        {friend.isFavorite ? (
          <HiStar className="text-main2" />
        ) : (
          <HiOutlineStar />
        )}
      </button>
      <div className="flex flex-1 gap-3 items-center" onClick={onClick}>
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
      </div>
    </li>
  );
}
