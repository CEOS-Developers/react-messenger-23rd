import add from '../../icons/icon_add.svg';

const CATEGORIES = [
  { id: 'all', label: '모두', isActive: true },
  { id: 'unread', label: '읽지 않음 ', isActive: false },
  { id: 'favorites', label: '즐겨찾기', isActive: false },
  { id: 'groups', label: '그룹 2', isActive: false },
];

export const ChatCategory = () => {
  return (
    <div className="w-full inline-flex justify-start items-center gap-2 px-4 mb-4">
      {/* 카테고리 리스트 */}
      {CATEGORIES.map(({ id, label, isActive }) => (
        <button
          key={id}
          className={`h-8 px-3 py-2.5 rounded-2xl outline outline-offset-1 flex justify-center items-center gap-2.5 ${
            isActive
              ? 'bg-emerald-100 outline-green-800/30 text-green-700'
              : 'bg-white outline-gray-200 text-neutral-500'
          }`}
        >
          <span className="text-sm font-medium font-['Pretendard'] leading-5">
            {label}
          </span>
        </button>
      ))}

      {/* 추가 버튼 */}
      <button className="h-8 px-1.5 py-2.5 bg-white rounded-2xl outline outline-offset-1 outline-gray-200 flex justify-center items-center gap-2.5">
        <div className="w-6 h-6 relative">
          <img src={add} alt="추가" />
        </div>
      </button>
    </div>
  );
};