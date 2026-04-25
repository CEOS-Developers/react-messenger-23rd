import type { Friend } from '@/entities/user/model/types';
import downSideIcon from '@/shared/assets/icons/friends/downside (24_24).svg';
import upSideIcon from '@/shared/assets/icons/friends/upside(24_24).svg';

import FriendItem from './FriendItem';

interface FriendsListProps {
  isOpen: boolean;
  onToggle: () => void;
}

const mockFriends: Friend[] = [
  { id: 1, name: '강감찬', status: 'read' },
  { id: 2, name: '김씨', status: 'yet' },
  { id: 3, name: '나훈아', status: 'none' },
  { id: 4, name: '남궁선', status: 'read' },
  { id: 4, name: '박지훈', status: 'none' },
  { id: 4, name: '백하린', status: 'yet' },
  { id: 4, name: '이지후', status: 'none' },
  { id: 4, name: '한다현', status: 'none' },
  { id: 4, name: '한아현', status: 'none' },
];

const FriendsList = ({ isOpen, onToggle }: FriendsListProps) => {
  return (
    <div className="flex flex-col">
      <div className="px-4">
        <div className="border-t border-gray-20" />
      </div>

      <button type="button" onClick={onToggle} className="flex items-center justify-between px-4 py-3">
        <span className="Body03R text-gray-70">{`친구(${mockFriends.length})`}</span>

        <img src={isOpen ? upSideIcon : downSideIcon} alt="친구 목록 토글" className="h-6 w-6" />
      </button>

      {isOpen && (
        <section className="py-3">
          {mockFriends.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
        </section>
      )}
    </div>
  );
};

export default FriendsList;
