import earth from "../../assets/chat-list/earth.png";
import positionOff from "../../assets/chat-list/position-off.svg";

function CurrentPlace() {
  return (
    <div className="flex w-[var(--screen-width)] items-end gap-[18px] pt-[var(--space-6)] px-[var(--space-12)] pb-[28px]">
      <section className="flex w-[84px] shrink-0 flex-col items-center gap-[var(--space-4)]">
        <img
          src={earth}
          alt="지도"
          className="h-[84px] self-stretch aspect-square"
        />
        <div>지도</div>
      </section>
      <section className="flex w-[84px] shrink-0 flex-col items-center gap-[var(--space-4)]">
        <section></section>
        <section className="flex items-center gap-[2px]">
          <div className="flex h-[10px] w-[10px] items-center justify-center p-[1.15px]">
            <img
              src={positionOff}
              alt="위치 해제"
              className="w-[7.7px] h-[7.7px] shrink-0 aspect-square"
            />
          </div>
          <div className="text-center text-[10px] font-medium leading-[115%] text-[#0A1014]">
            내 위치 해제됨
          </div>
        </section>
      </section>
    </div>
  );
}

export default CurrentPlace;
