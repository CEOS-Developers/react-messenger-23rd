import { useFriendsStore } from "@/store/useFriendsStore";
import Friend from "@/components/friends/Friend";

export default function FriendsList() {
  const friends = useFriendsStore((s) => s.friends);

  return (
    <div className="flex flex-col">
      {friends.map((friend) => (
        <Friend key={friend.id} name={friend.name} statusMessage={friend.statusMessage} />
      ))}
    </div>
  );
}
