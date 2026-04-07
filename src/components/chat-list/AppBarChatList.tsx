import backChatList from "../../assets/chat-page/back-chat-list.svg";
import swap from "../../assets/chat-list/swap.svg";
import newChat from "../../assets/chat-list/new-chat.svg";

function AppBarChatList() {
  return (
    <div className="flex w-[var(--screen-width)] h-[44px] px-[var(--space-12)] justify-between items-center bg-[var(--color-grey-50)]">
      <section className="flex items-center">
        <button className="flex w-[var(--screen-32)] h-[var(--screen-32)] items-center justify-center p-[var(--space-4)]">
          <img
            src={backChatList}
            alt="backChatList"
            className="w-[var(--size-24)] h-[var(--size-24)] shrink-0 aspect-square"
          />
        </button>
        <section className="flex px-[var(--space-8)] items-center gap-[var(--space-4)]">
          <div className="text-[22px] font-bold leading-[140%] tracking-[-0.66px]">
            minyouwoo
          </div>
          <button>
            <img
              src={swap}
              alt="swap"
              className="w-[var(--size-12)] h-[var(--size-12)] aspect-square"
            />
          </button>
        </section>
      </section>
      <section>
        <button className="flex w-[var(--screen-32)] h-[var(--screen-32)] items-center justify-center p-[var(--space-4)] shrink-0">
          <img
            src={newChat}
            alt="newChat"
            className="w-[var(--size-24)] h-[var(--size-24)] shrink-0"
          />
        </button>
      </section>
    </div>
  );
}

export default AppBarChatList;
