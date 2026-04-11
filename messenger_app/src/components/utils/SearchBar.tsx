import search from '@/icons/icon_search.svg';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="px-4">
      {/* 검색창 */}
      <div className="flex items-center gap-1.5 w-full my-5 h-8.5 bg-Gray300 rounded-[10px] px-1 py-1.25">
        <div className="flex items-center justify-center w-6 h-6">
          <img src={search} alt="" />
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full text-body-02 text-Gray600 placeholder-opacity-100 outline-none"
          placeholder="검색"
        />
      </div>
    </div>
  );
};
