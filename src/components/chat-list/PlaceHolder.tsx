import search from "../../assets/chat-list/search.svg";

function PlaceHolder() {
  return (
    <div className="inline-flex flex-col items-start gap-[var(--space-10)] px-[var(--space-10)] py-[var(--space-12)]">
      <div className="flex w-[351px] items-center gap-[5px] rounded-[8px] bg-[var(--color-grey-100)] p-[var(--space-8)]">
        <div className="w-[16px] h-[16px] shrink-0">
          <img src={search} alt="search" className="w-[13px] h-[13px]" />
        </div>
        <input
          type="text"
          placeholder="검색"
          className="text-[var(--text-sm)] font-medium leading-[var(--line-height-tight)] text-[var(--color-grey-600)] outline-none"
        ></input>
      </div>
    </div>
  );
}

export default PlaceHolder;
