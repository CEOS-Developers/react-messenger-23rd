import type { Friend } from '@/entities/user/model/types';

const FriendItem = ({ friend }: { friend: Friend }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-4">
        <div className="h-9 w-9 rounded-[8px] bg-main-light2" />
        <span className="Body01M text-gray-90">{friend.name}</span>
      </div>

      {friend.status !== 'none' && <div className="h-8 w-8 rounded-full bg-gray-10" />}
    </div>
  );
};

export default FriendItem;
