import searchIcon from "@/assets/icons/search.svg";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="px-5">
      <div className="flex items-center gap-3 px-4 h-11 bg-surface-search border border-surface-chat rounded-full">
        <img src={searchIcon} alt="" className="w-6 h-6" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="검색"
          className="flex-1 bg-transparent text-[16px] font-medium leading-[140%] text-content-primary placeholder-content-placeholder outline-none"
        />
      </div>
    </div>
  );
}
