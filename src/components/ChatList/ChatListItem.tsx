import ChatTime from "@/components/ChatList/ChatTime";
import ProfileImage from "@/components/ChatList/ProfileImage";
import Alert from "@/components/Common/Alert";

interface ProfileData {
  name: string;
  profileColor: string;
}

interface ChatListItemProps {
  profiles: ProfileData[];
  lastMessage: string;
  time: string;
  isRead: boolean;
  isFixed?: boolean;
  alertCount?: number;
}

const getDisplayName = (profiles: ProfileData[]) => {
  const count = profiles.length;
  const names = profiles.map(p => p.name);

  if (count === 1) return { name: names[0], count: null };
  if (count <= 3) return { name: names.join(", "), count };

  return { name: `${names.slice(0, 3).join(", ")}, ${names[3][0]}...`, count };
};

const ChatListItem = ({
  profiles,
  lastMessage,
  time,
  isRead,
  isFixed = false,
  alertCount,
}: ChatListItemProps) => {
  const { name, count } = getDisplayName(profiles);
  const hasAlert = alertCount !== undefined && alertCount > 0;

  return (
    <div className="flex cursor-pointer items-center gap-3 p-4">
      <ProfileImage profiles={profiles} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 items-center gap-1">
            <span className="font-body-1 truncate text-black">{name}</span>
            {count !== null && <span className="font-body-2 shrink-0 text-gray-400">{count}</span>}
          </div>
          <ChatTime time={time} isRead={isRead} isFixed={isFixed} />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-body-6 text-gray-500">
            {lastMessage.length > 24 ? `${lastMessage.slice(0, 24)}...` : lastMessage}
          </span>
          {hasAlert && <Alert count={alertCount!} />}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
