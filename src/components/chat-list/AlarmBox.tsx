import Alarm from "../../assets/chat-list/alarm.svg";

function AlarmBox() {
  return (
    <div className="inline-flex px-[var(--space-12)] py-[var(--space-4)] items-center gap-[235px]">
      <section className="flex px-[var(--space-4)] py-[var(--space-8)] items-center gap-[2px]">
        <div className="text-[var(--text-sm)] font-semibold leading-[var(--line-height-tight)] text-[var(--color-text-primary)]">
          메시지
        </div>
        <div className="flex w-[var(--space-20)] h-[var(--space-20)] items-center justify-center gap-[var(--space-10)]">
          <img
            src={Alarm}
            alt="Alarm"
            className="w-[var(--space-16)] h-[var(--space-16)] shrink-0"
          />
        </div>
      </section>
      <section className="flex px-[var(--space-8)] py-[var(--space-10)] items-center justify-center gap-[var(--space-10)]">
        <div className="text-[var(--text-xs)] font-semibold leading-[var(--line-height-tight)] text-[var(--color-grey-600)]">
          요청
        </div>
      </section>
    </div>
  );
}

export default AlarmBox;
