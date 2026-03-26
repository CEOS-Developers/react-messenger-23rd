import searchIcon from "@/assets/icons/search.svg";

export default function SearchBar() {
  return (
    <div className="px-5">
      <div className="flex items-center gap-3 px-4 h-11 bg-surface-search border border-surface-chat rounded-full">
        <img src={searchIcon} alt="" className="w-6 h-6" />
        <span className="text-[16px] font-semibold leading-[140%] text-content-placeholder">
          검색
        </span>
      </div>
    </div>
  );
}
