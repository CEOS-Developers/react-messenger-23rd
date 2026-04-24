import home from "../../assets/chat-list/home.svg";
import search from "../../assets/chat-list/search.svg";
import plus from "../../assets/chat-list/plus.svg";
import send from "../../assets/chat-list/send.svg";
import navProfile from "../../assets/chat-list/nav-profile.svg";

function NavBarChatList() {
  return (
    <div>
      <div className="flex w-[var(--screen-width)] flex-col items-start border-t border-t-[size:1px] border-t-[color:var(--color-grey-300)] bg-[color:var(--color-grey-50)]">
        <section className="flex self-stretch items-center justify-between px-[var(--space-12)]">
          <button className="flex h-[44px] w-[44px] items-center justify-center gap-[var(--space-10)]">
            <img
              src={home}
              alt="home"
              className="flex size-[var(--size-24)] shrink-0 items-center justify-center"
            />
          </button>
          <button className="flex h-[44px] w-[44px] items-center justify-center gap-[var(--space-10)]">
            <img
              src={search}
              alt="search"
              className="flex size-[var(--size-24)] shrink-0 items-center justify-center"
            />
          </button>
          <button className="flex h-[44px] w-[44px] items-center justify-center gap-[var(--space-10)]">
            <img
              src={plus}
              alt="plus"
              className="flex size-[var(--size-24)] shrink-0 items-center justify-center"
            />
          </button>
          <button className="flex h-[44px] w-[44px] items-center justify-center gap-[var(--space-10)]">
            <img
              src={send}
              alt="send"
              className="flex size-[var(--size-24)] shrink-0 items-center justify-center"
            />
          </button>
          <button className="flex h-[44px] w-[44px] items-center justify-center gap-[var(--space-10)]">
            <img
              src={navProfile}
              alt="navProfile"
              className="flex size-[var(--size-24)] shrink-0 items-center justify-center"
            />
          </button>
        </section>
        <section className="flex h-[34px] self-stretch items-center justify-center pt-[21px] pr-[115px] pb-[var(--space-8)] pl-[116px]"></section>
      </div>
    </div>
  );
}

export default NavBarChatList;
