import mockFriends from "@/data/mockFriends.json";
import Friend from "@/components/friends/Friend";

export default function FriendsList() {
  return (
    <div className="flex flex-col">
      {mockFriends.map((friend) => (
        <Friend key={friend.id} name={friend.name} statusMessage={friend.statusMessage} />
      ))}
    </div>
  );
}
