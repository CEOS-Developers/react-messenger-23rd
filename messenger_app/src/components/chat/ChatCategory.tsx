import add from '@/icons/icon_add.svg';
import { useChatStore } from '@/store/useChatStore';

const CATEGORIES = [
  { id: 'all', label: '모두', isActive: true },
  { id: 'unread', label: '읽지 않음 ', isActive: false },
  { id: 'favorites', label: '즐겨찾기', isActive: false },
  { id: 'groups', label: '그룹 ', isActive: false },
];

export const ChatCategory = () => {
  const { chatRooms } = useChatStore();
  const totalUnreadCount = chatRooms.reduce((acc, room) => acc + room.unreadCount, 0);
  const groupCount = chatRooms.filter(room => room.isGroup).length;
  
  return (
    <div className="w-full inline-flex items-center justify-between gap-2 px-4 mb-4">
      {/* 카테고리 리스트 */}
      {CATEGORIES.map(({ id, label, isActive }) => (
        <button
          key={id}
          className={`flex h-8 px-3 py-2.5 rounded-2xl outline outline-offset-1 justify-center items-center gap-2.5 ${
            isActive
              ? 'bg-green100 border-green-800/30 text-green400'
              : 'bg-white outline-Gray300 text-Gray600'
          }`}
        >
          <span className="text-label">
            {label}
            {id === 'unread' && totalUnreadCount > 0 && (
              <span>
                {totalUnreadCount}
              </span>
            )}
            {id === 'groups' && groupCount > 0 && (
              <span>
                {groupCount}
              </span>
            )}
          </span>
        </button>
      ))}

      {/* 추가 버튼 */}
      <button className="h-8 px-1.5 py-2.5 bg-white rounded-2xl outline outline-offset-1 outline-Gray300 flex justify-center items-center gap-2.5">
        <div className="w-6 h-6 relative">
          <img src={add} alt="추가" />
        </div>
      </button>
    </div>
  );
};