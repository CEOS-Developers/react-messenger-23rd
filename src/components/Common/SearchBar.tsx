import SearchIcon from "@/assets/icons/icon_search_regular.svg?react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <div className="px-4 py-1">
      <div className="rounded-100 flex w-85.75 items-center gap-2 bg-gray-100 px-4 py-3 text-center">
        <SearchIcon className="size-5 shrink-0 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="font-body-6 w-full max-w-68 min-w-0 overflow-x-auto bg-transparent whitespace-nowrap text-gray-600 outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;
