import { useFriendsStore } from "@/store/useFriendsStore";
import Friend from "@/components/friends/Friend";

export default function FriendsList() {
  const allFriends = useFriendsStore((s) => s.friends);
  const friends = allFriends.filter((f) => f.id !== 1);

  return (
    <div className="flex flex-col">
      {friends.map((friend) => (
        <Friend key={friend.id} id={friend.id} name={friend.name} />
      ))}
    </div>
  );
}
