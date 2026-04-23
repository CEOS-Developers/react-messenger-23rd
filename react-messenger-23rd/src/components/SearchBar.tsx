import IconSearch from "@/assets/icons/icon_search.svg?react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="px-5">
      <div className="flex items-center gap-3 px-4 h-11 bg-surface-subtle border border-surface-muted rounded-full">
        <IconSearch className="w-6 h-6" aria-hidden="true" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="검색"
          className="flex-1 bg-transparent text-body1-sb text-content-primary placeholder-content-hint outline-none"
        />
      </div>
    </div>
  );
}
