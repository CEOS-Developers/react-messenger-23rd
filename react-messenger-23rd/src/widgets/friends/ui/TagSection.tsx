import downSideIcon from '@/shared/assets/icons/friends/downside (24_24).svg';
import plusIcon from '@/shared/assets/icons/friends/plus.svg';
import rightSideIcon from '@/shared/assets/icons/friends/rightside(24_24).svg';
import upSideIcon from '@/shared/assets/icons/friends/upside(24_24).svg';

interface TagSectionProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface Tag {
  id: number;
  name: string;
  count: number;
}

const mockTags: Tag[] = [
  { id: 1, name: '우강고토주', count: 5 },
  { id: 2, name: '홍익시디', count: 24 },
  { id: 3, name: '세오스 디자인', count: 17 },
];
const TagSection = ({ isOpen, onToggle }: TagSectionProps) => {
  return (
    <div className="flex flex-col">
      {/* divider */}
      <div className="px-4">
        <div className="border-t border-gray-20" />
      </div>

      {/* 헤더 */}
      <button type="button" onClick={onToggle} className="flex items-center justify-between px-4 py-3">
        <span className="Body03R text-gray-70">태그</span>
        <img src={isOpen ? upSideIcon : downSideIcon} alt="태그 토글" className="h-6 w-6" />
      </button>

      {/* 내용 */}
      {isOpen && (
        <div className="flex flex-col gap-3 px-4 pb-5 pt-1 mb-2">
          {/* 태그 리스트 */}
          <div className="flex flex-col gap-1">
            {mockTags.map((tag) => (
              <button key={tag.id} type="button" className="inline-flex items-center gap-4 py-2 text-left">
                <span className="Body01M text-gray-80">{tag.name}</span>

                <div className="flex items-center">
                  <span className="Body03R text-gray-70">{tag.count}</span>
                  <img src={rightSideIcon} alt="" className="h-6 w-6" />
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2.5">
            <button
              type="button"
              className="mt-2 inline-flex items-center overflow-hidden gap-1 rounded-[8px] bg-gray-10 pl-3 pr-4 py-2"
            >
              <img src={plusIcon} alt="추가" className="h-4 w-4" />
              <span className="Body03M text-gray-70">추가하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSection;
